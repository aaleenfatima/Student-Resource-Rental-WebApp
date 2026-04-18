const express = require('express');
const cors = require('cors');
const dbOperations = require('./dbFiles/dbOperations');
const app = express();
const PORT = 5000;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Emailservice = require('./dbFiles/sendEmail');
const sql = require('mssql'); // Import the SQL Server library
const config  = require('./dbFiles/dbConfig');
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's URL
    credentials: true
  }));
  app.use(express.json()); 

const session = require("express-session");

app.use(session({
    secret: "your-secret-key",  // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set `true` if using HTTPS
}));

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js API!');
});

app.get('/users', async (req, res) => {
    try {
        const users = await dbOperations.getUsers();
        res.json(users.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.post("/signin", async (req, res) => {
    const { Email, password } = req.body;
    if (!Email || !password) {
        console.log("❌ Missing Email or password in request");
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await dbOperations.verifyUser(Email, password);
        

        if (!user) {
            console.log("❌ Invalid credentials for Email:", Email); 
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        req.session.user = { RollNo: user.RollNo };
        console.log(req.session.user.RollNo)
        res.json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error("❌ Error in /signin:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

app.post("/signup",upload.array('images', 1), async (req, res) => {
    const { UserName, Email, password, Contact, RollNo, BloodGroup, U_Address, Age, Gender } = req.body;
    const files = req.files;
    if (!UserName || !Email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        await dbOperations.registerUser(UserName, Email, password, Contact, RollNo, BloodGroup, U_Address, Age, Gender , files[0].buffer , files[0].mimetype);
        res.json({ success: true, message: "User registered successfully" });
        req.session.user = { RollNo: user.RollNo };
    } catch (error) {
        console.error("❌ Error in /signup:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

app.get('/my-ads', async (req, res) => {
    const rollNo = req.session?.user?.RollNo;
    const avail = req.query.avail !== undefined ? parseInt(req.query.avail) : 1; // default to 1

    if (!rollNo) {
        return res.status(401).json({ success: false, message: "You must be logged in to view your ads." });
    }

    if (isNaN(avail) || (avail !== 0 && avail !== 1)) {
        return res.status(400).json({ success: false, message: "Invalid availability value. Must be 0 or 1." });
    }

    try {
        const ads = await dbOperations.getMyAds(rollNo, avail);

        res.json({
            success: true,
            rollNo,
            availability: avail,
            data: ads
        });
    } catch (error) {
        console.error("❌ Error in /my-ads:", error);
        res.status(500).json({ success: false, message: "Failed to fetch your ads", error });
    }
});

app.get('/user-ads', async (req, res) => {
    const adId = parseInt(req.query.adId);

    if (isNaN(adId)) {
        return res.status(400).json({ success: false, message: "Invalid or missing ad ID." });
    }

    try {
        const rollNo = await dbOperations.getRollNoFromAd(adId); // get user of that ad

        if (!rollNo) {
            return res.status(404).json({ success: false, message: "No user found for this ad." });
        }

        const ads = await dbOperations.getMyAds(rollNo, 1); // fetch all their ads

        res.json({
            success: true,
            userRollNo: rollNo,
            sourceAdId: adId,
            data: ads
        });
    } catch (error) {
        console.error("❌ Error in /user-ads:", error);
        res.status(500).json({ success: false, message: "Could not fetch user's ads", error });
    }
});

app.get('/search', async (req, res) => {
    const { adType, category, maxPrice, rating, q } = req.query;

    try {
        const results = await dbOperations.searchWithFilters({
            adType,
            category,
            maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            rating: rating ? parseInt(rating) : undefined,
            search: q
        });

        res.json({
            success: true,
            count: results.length,
            filters: { adType, category, maxPrice, rating, search: q },
            results
        });
    } catch (error) {
        console.error("❌ Error in /search:", error);
        res.status(500).json({ success: false, message: "Search failed", error });
    }
});

app.get('/LAF', async (req, res) => {
    try {
        await dbOperations.deleteOldLAFEntries();
        const LAF = await dbOperations.LAFdata();
        res.json(LAF.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching LAF data', error });
    }
});

app.post('/Request-Blood', async (req, res) => {
    const { donationDate, bloodGroup, location, units } = req.body;
    const rollNo = req.session?.user?.RollNo;
    if (
        !rollNo ||
        !donationDate ||
        !bloodGroup ||
        !location ||
        !units ||
        isNaN(units) ||
        isNaN(Date.parse(donationDate))
    ){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const result = await dbOperations.addBloodRecord(rollNo, donationDate, bloodGroup, location, units);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add blood record", error });
    }
});
app.get('/getreqdata', async (req, res) => {
    const rollNo = req.session.user?.RollNo;
    console.log(req.session.user);
    if (!rollNo) {
        return res.status(400).json({ success: false, message: "User must be logged in" });
    }

    try {
        console.log("inside try of getreqdata");
        const result = await dbOperations.getrequestdata(rollNo);
        console.log("data fetched");
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('❌ Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});
app.post('/send-request', async (req, res) => {
        
    const { RollNo2, ad_id } = req.body;
    
    if ( !RollNo2 || !ad_id) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    console.log(RollNo2, ad_id);

    try {
        console.log("inside the send-request");
        const pool = await sql.connect(config);
        
        const RollNo1 = await pool.request().input('ad_id',sql.Int,ad_id).query('Select RollNo from Advertisement where ad_id = @ad_id');
        console.log("Owner RollNo",RollNo1.recordset[0].RollNo);
        // Get owner's email
        const ownerEmail = await pool.request()
            .input('RollNo', sql.NVarChar(50), RollNo1.recordset[0].RollNo)
            .query('SELECT Email FROM User_profile WHERE RollNo = @RollNo');
        
        if (!ownerEmail.recordset.length) {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }

        await pool.request()
            .input('RollNo1', sql.NVarChar(50), RollNo1.recordset[0].RollNo)
            .input('RollNo2', sql.NVarChar(50), RollNo2)
            .input('ad_id', sql.Int, ad_id)
            .execute('SendRequest');
        const emailResult = await Emailservice.sendEmail(ownerEmail.recordset[0].Email, 
            'New Request Received', 
            `You have received a new request for Ad ID ${ad_id} from Roll No ${RollNo2}.`);

        res.json({ success: true, message: 'Request sent and email notification sent to owner' });

    } catch (error) {
        console.error('❌ Error sending request:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});
app.get('/user-contact', async (req, res) => {
    const rollNo = req.session?.user?.RollNo;
    if (!rollNo) {
        return res.status(400).json({ success: false, message: 'RollNo missing in session' });
    }

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('RollNo', sql.VarChar(50), rollNo)
            .query('SELECT Contact FROM User_profile WHERE RollNo = @RollNo');

        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.json({ success: true, contact: result.recordset[0].Contact });

    } catch (err) {
        console.error("❌ Error in /user-contact:", err);
        res.status(500).json({ success: false, message: 'Internal error' });
    }
});




app.get('/Blood-Record', async (req, res) => {
    try {
        const Blooddata = await dbOperations.Blooddata();
        res.json(Blooddata.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Blood Record data', error });
    }
});

app.get('/Blood-Record/Me', async (req, res) => {
    try {
        const rollNo = req.session?.user?.RollNo;
        const Blooddata = await dbOperations.MyBlooddata(rollNo);
        res.json(Blooddata.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Blood Record data', error });
    }
});


app.delete('/Blood-Record/Me/:id', async (req, res) => {
    const recordId = parseInt(req.params.id);

    if (isNaN(recordId)) {
        return res.status(400).json({ success: false, message: 'Invalid Blood Record ID' });
    }

    try {
        const result = await dbOperations.deleteBlooddata(recordId);
        res.json({ success: true, ...result }); // Message: "Deleted Successfully"
    } catch (error) {
        console.error("❌ Error in /Blood-Record/:id:", error);
        res.status(500).json({ success: false, message: 'Failed to delete Blood Record', error });
    }
});

app.post('/ads', upload.array('images', 5), async (req, res) => {
    try {
        const rollNo = req.session?.user?.RollNo;
        if (!rollNo) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const { category, tag, date, SI, details } = req.body;
        
        // Register the ad (without availability)
        const adId = await dbOperations.registerAd(rollNo, category, tag, date, SI);

        // Parse details
        const adDetails = typeof details === 'string' ? JSON.parse(details) : details;

        // Handle specific ad type with availability=1 by default
        switch (tag.toLowerCase()) {
            case 'skill':
                await dbOperations.addSkillAd(
                    adId,
                    adDetails.price,
                    adDetails.SkillName,
                    adDetails.Description,
                    1, // Default availability to 1
                    adDetails.Level
                );
                break;
            case 'product ad':
                await dbOperations.addProductAd(
                    adId,
                    adDetails.name,
                    adDetails.description,
                    adDetails.color,
                    adDetails.condition,
                    1, // Default availability to 1
                    adDetails.price
                );
                break;
            case 'request ad':
                await dbOperations.addRequestAd(
                    adId,
                    adDetails.item,
                    adDetails.description,
                    adDetails.color,
                    adDetails.condition,
                    1, // Default availability to 1
                    adDetails.urgency
                );
                break;
            default:
                throw new Error('Invalid ad type');
        }

        // Handle images
        if (req.files?.length > 0) {
            for (const image of req.files) {
                await dbOperations.addAdImage(adId, image.buffer, image.mimetype);
            }
        }

        res.json({ success: true, adId });
        
    } catch (err) {
        console.error('Error in /ads endpoint:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message
        });
    }
});

app.post('/laf/report', upload.single('Picture'), async (req, res) => {
    const { ItemDescription, Location_Found, report_date } = req.body;
    const rollNo = req.session?.user?.RollNo;
    const pictureBuffer = req.file ? req.file.buffer : null;
    const mimeType = req.file ? req.file.mimetype : null;

    // Basic validation
    if (!ItemDescription || !Location_Found || !report_date || !rollNo) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const result = await dbOperations.addLAFEntry(
            pictureBuffer,
            mimeType,
            ItemDescription,
            Location_Found,
            rollNo,
            report_date
        );

        res.json({ success: true, message: "LAF report submitted successfully" });
    } catch (error) {
        console.error("❌ Error in /laf/report:", error);
        res.status(500).json({ success: false, message: "Failed to submit LAF report", error });
    }
});

app.put('/updateAd/:adId', async (req, res) => {
    const adId = parseInt(req.params.id);
    const { category, tag, date, SI, details } = req.body;
    const rollNo = req.session?.user?.RollNo;
    if (!rollNo) {
        return res.status(400).json({ success: false, message: "User not LogedIn" });
    }
    try {
      await dbOperations.updateAdBase(adId, category, tag, date, SI);
  
      switch (tag) {
        case 'Skill':
          await dbOperations.updateSkillAd(
            adId,
            details.SkillName,
            details.Description,
            details.Price,
            details.Availability,
            details.Level
          );
          break;
  
        case 'ProductAd':
          await dbOperations.updateProductAd(
            adId,
            details.name,
            details.description,
            details.color,
            details.condition,
            details.availability,
            details.price
          );
          break;
  
        case 'RequestAd':
          await dbOperations.updateRequestAd(
            adId,
            details.item,
            details.description,
            details.color,
            details.condition,
            details.availability,
            details.urgency
          );
          break;
  
        default:
          return res.status(400).json({ success: false, message: "Invalid ad tag." });
      }
  
      res.json({ success: true, message: "Ad updated successfully." });
  
    } catch (error) {
      console.error("❌ Error updating ad:", error);
      res.status(500).json({ success: false, message: "Failed to update ad", error });
    }
  });
  
// Fetch ad details by AdID
app.get("/ad/:AdID", async (req, res) => {
    const { AdID } = req.params;

    try {
        const pool = await sql.connect(config);
        
        // Get main ad details
        const adDetails = await pool.request()
            .input('AdID', sql.Int, AdID)
            .execute('GetAdDetailsById');

        // Get associated images
        const imagesResult = await pool.request()
            .input('AdID', sql.Int, AdID)
            .query('SELECT Image, MimeType FROM AdImages WHERE AdID = @AdID ORDER BY ImageID');

        // Process images to URLs
        const images = imagesResult.recordset.map(img => ({
            url: `data:${img.MimeType};base64,${img.Image.toString('base64')}`
        }));

        // If no images, use placeholder
        if (images.length === 0) {
            images.push({ url: '/placeholder-image.jpg' });
        }

        res.json({
            success: true,
            adDetails: {
                ...adDetails.recordset[0],
                images
            }
        });

    } catch (error) {
        console.error("Error fetching ad details:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
app.get('/get-email/:rollNo', async (req, res) => {
    try {
        const rollNo = req.params.rollNo;
        const result = await dbOperations.getEmailByRollNo (rollNo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving email", error: error.message });
    }
});
// Add this route to server.js
// In your server.js /userprofile endpoint
app.get('/userprofile', async (req, res) => {
    const rollNo = req.session.user?.RollNo;
    console.log("Session RollNo:", rollNo);
    
    if (!rollNo) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const data = await dbOperations.getnameandpic(rollNo);
        console.log("Database response:", data); // Add this line
        
        if (data) {
            res.json({
                success: true,
                name: data.UserName,
                profileImage: data.ProfilePhoto, // Should be base64 string
                rollNo: rollNo
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
/*app.get('/userprofile', async (req, res) => {
    try {
      const rollNo = req.session.user?.RollNo;
      if (!rollNo) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
  
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('RollNo', sql.NVarChar, rollNo)
        .query(`
          SELECT UserName AS name, Email AS email, 
                 Profile_photo AS profileImage,
                 RollNo
          FROM User_profile 
          WHERE RollNo = @RollNo
        `);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(result.recordset[0]);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }); */
  app.get('/alluserprofile', async (req, res) => {
    const rollNo = req.session?.user?.RollNo;
  
    if (!rollNo) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }
  
    try {
      const profile = await dbOperations.getAllUserProfile(rollNo);
      if (!profile) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error("❌ Error in /alluserprofile:", error);
      res.status(500).json({ success: false, message: "Failed to fetch user profile", error });
    }
  });
  
  
  // Add signout endpoint
  app.post('/signout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });

  app.put("/update-profile", upload.single("NewPhoto"), async (req, res) => {
    // Get RollNo from session instead of request body
    const rollNo = req.session.user?.RollNo;
    const { NewPassword, NewContact, NewAddress } = req.body;
    const file = req.file; // Uploaded image file (optional)

    if (!rollNo) {
        return res.status(401).json({ 
            success: false, 
            message: "Not authenticated. Please log in." 
        });
    }

    try {
        // Extract image buffer and MIME type if file exists
        const imageBuffer = file ? file.buffer : null;
        const Ptype = file ? file.mimetype : null;

        // Call DB operation to update user profile
        await dbOperations.updateUserProfile(
            rollNo, 
            NewPassword, 
            NewContact, 
            NewAddress, 
            imageBuffer, 
            Ptype
        );

        res.json({ 
            success: true, 
            message: "Profile updated successfully" 
        });
    } catch (error) {
        console.error("❌ Error in /update-profile:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during profile update",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.post('/accept-request', async (req, res) => {
    const { RequestID, Approval, X, Y } = req.body;  // `Approval` is 1 for accept, 0 for decline

    if (!RequestID || Approval === undefined) {
        return res.status(400).json({ success: false, message: 'RequestID and Approval are required' });
    }

    try {
        const pool = await sql.connect(config);

        // Get request details
        const request = await pool.request()
            .input('RequestID', sql.Int, RequestID)
            .query(`
                SELECT RollNo1 AS OwnerRollNo, RollNo2 AS RequesterRollNo, ad_id 
                FROM RequestRecords 
                WHERE RequestID = @RequestID AND State = 'Pending'
            `);

        if (!request.recordset.length) {
            return res.status(404).json({ success: false, message: 'Request not found or already processed' });
        }

        const { OwnerRollNo, RequesterRollNo, AdID } = request.recordset[0];

        // Get requester's email and name
        const requester = await pool.request()
            .input('RollNo', sql.NVarChar(100), RequesterRollNo)
            .query('SELECT Email, UserName FROM User_profile WHERE RollNo = @RollNo');

        if (!requester.recordset.length) {
            return res.status(404).json({ success: false, message: 'Requester not found' });
        }

        const { Email, UserName } = requester.recordset[0];

        // Get owner's name
        const owner = await pool.request()
            .input('RollNo', sql.NVarChar(100), OwnerRollNo)
            .query('SELECT UserName FROM User_profile WHERE RollNo = @RollNo');

        if (!owner.recordset.length) {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }

        const ownerName = owner.recordset[0].UserName;

        let message = "";
        let newState = Approval == 1 ? 'Processed' : 'Declined';

        if (Approval == 1) {
            message = `
Dear ${UserName},

Great news! ${ownerName} has accepted your request for the listing (Ad ID: ${AdID}).

📍 **Meeting Details**:
- **Location**: ${X}
- **Time**: ${Y}

Please respond at your earliest convenience to finalize the details.

Best regards,  
**UniShare Team**
            `;
        } else {
            message = `
Dear ${UserName},

Thank you for your interest in the listing (Ad ID: ${AdID}). Unfortunately, ${ownerName} has decided not to proceed with your request at this time.

We appreciate your understanding and wish you the best in finding a suitable listing.

Best regards,  
**UniShare Team**
            `;
        }

        // Update request state in database
        await pool.request()
            .input('RequestID', sql.Int, RequestID)
            .input('NewState', sql.VarChar(20), newState)
            .query('UPDATE RequestRecords SET State = @NewState WHERE RequestID = @RequestID');

        // Send email notification
        await Emailservice.sendEmail(
            Email, 
            `Update on Your Inquiry (Ad ID: ${AdID})`, 
            message
        );

        res.json({ success: true, message: `Request ${newState.toLowerCase()} and email sent.` });

    } catch (error) {
        console.error('❌ Error in /accept-request:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

app.post('/decline-request', async (req, res) => {
    const { RequestID } = req.body;

    if (!RequestID) {
        return res.status(400).json({ success: false, message: 'RequestID is required' });
    }

    try {
        const pool = await sql.connect(config);

        await pool.request()
            .input('RequestID', sql.Int, RequestID)
            .execute('DeclineRequest');

        res.json({ success: true, message: 'Request declined' });

    } catch (error) {
        console.error('❌ Error declining request:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});
const completeExpiredRequests = async () => {
    try {
        const pool = await sql.connect(config);

        const expiredRequests = await pool.request()
            .query('SELECT RequestID, RollNo1, RollNo2, AdID FROM RequestRecords WHERE State = \'Processed\' AND RequestDate <= DATEADD(MONTH, 4, GETDATE())');

        for (const request of expiredRequests.recordset) {
            await pool.request()
                .input('RequestID', sql.Int, request.RequestID)
                .execute('CompleteRequest');

            // Get requester email
            const requesterEmail = await pool.request()
                .input('RollNo', sql.NVarChar(50), request.RollNo2)
                .query('SELECT Email FROM User_profile WHERE RollNo = @RollNo');

            if (requesterEmail.recordset.length) {
                await sendEmail(requesterEmail.recordset[0].Email, 
                    'Request Completion Reminder', 
                    `Reminder: The deadline for Ad ID ${request.AdID} has passed. Please complete the transaction.`);
            }
        }

        console.log('✔ Expired requests marked as completed');

    } catch (error) {
        console.error('❌ Error completing expired requests:', error);
    }
};
// Run this function daily at midnight
setInterval(completeExpiredRequests, 24 * 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
