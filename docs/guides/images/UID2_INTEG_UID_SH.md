## Disclaimer 1
THE FUNCTIONS BELOW ARE PROVIDED BY THE TRADE DESK, INC. ("TTD") "AS IS" AND "WITH ALL FAULTS." TTD SHALL HAVE NO OBLIGATION TO UPDATE THE SNOWFLAKE FUNCTIONS. ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHORS, TTD, OR TTD'S AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION SUSTAINED BY YOU OR ANY THIRD PARTY) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THESE FUNCTIONS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

## Disclaimer 2
- Instructions and functions provided are *examples only*, and not a complete implementation.
- Remember to consider the privacy aspects of what is being implemented, including checking Legal/Compliance requirements about user consent and use of DII.



## Begin Workflow
--When testing this workflow for the first time, use Drop Table queries. Otherwise, ignore.

```sql


--When testing this workflow for the first time, use Drop Table queries. Otherwise, ignore.

Drop Table UID_Test_Audience_March2025





--Create a new table to store Email addresses
Create Table UID_Test_Audience_March2025 ( ID INTEGER, EMAIL varchar(128))
    
-- Retrieve emails (or hashed emails) from your CDP or CRM platform    
INSERT INTO UID_Test_Audience_March2025 
VALUES
(1,'dummy1@demo.com'),
(2,'dummy2@demo.com'),
(3,'dummy3@demo.com'),
(4,'dummy4@demo.com'),
(5,'dummy5@demo.com'),
(6,'dummy6@demo.com'),
(7,'dummy7@demo.com'),
(8,'dummy8@demo.com'),
(9,'dummy9@demo.com'),
(10,'dummy10@demo.com')

--Query Table to confirm the emails are in your table
select * from UID_Test_Audience_March2025

-- new share name: UID2_INTEG_UID_SH


--Ignore for demo purposes. 
Drop Table UID_Test_Audience_March2025_withUID




--Create new empty table with emails, and 2 more columns to collect UID and Bucket ID. This step is in here to illustrate the progression of adding in UIDs and BucketIds
Create Table UID_Test_Audience_March2025_withUID ( ID INTEGER, EMAIL varchar(128), UID2 text, Bucket_ID text)
  

--Retrieve UID and bucket ID and insert into a new table, leveraging the functions from the integration guide to map your emails to UID2s
Insert into UID_Test_Audience_March2025_withUID 
select a.ID, a.EMAIL, m.UID, m.BUCKET_ID from UID_Test_Audience_March2025 a LEFT JOIN(
    select ID, t.* from UID_Test_Audience_March2025, lateral UID2_INTEG_UID_SH.UID.FN_T_IDENTITY_MAP(EMAIL, 'email') t) m
    on a.ID=m.ID;


    
    
--Confirm the values that now exist in your new table -- now you have mapped emails and can use your UID2s!
select * from UID_Test_Audience_March2025_withUID



--ignore for demo 
Drop Table UID_Test_Audience_March2025_withUID_withRetrieved 


--testing--

Create Table UID_Test_Audience_March2025_withUID_withRetrieved ( ID INTEGER, EMAIL varchar(128), UID2 text, Bucket_ID text, Last_Retrieved_date TIMESTAMP_NTZ)


--Create a new table with Last updated timestamp: this inserts the Current Timestamp - This has 5 columns
Insert into UID_Test_Audience_March2025_withUID_withRetrieved 
select a.ID, a.EMAIL, m.UID, m.BUCKET_ID, CURRENT_TIMESTAMP from UID_Test_Audience_March2025 a LEFT JOIN(
    select ID, t.* from UID_Test_Audience_March2025, lateral UID2_INTEG_UID_SH.UID.FN_T_IDENTITY_MAP(EMAIL, 'email') t) m
    on a.ID=m.ID;


--Confirm the values in your new table
select * from UID_Test_Audience_March2025_withUID_withRetrieved  


--Check last salt bucket rotataion for your UID2
select a.*, b.LAST_SALT_UPDATE_UTC
  from UID_Test_Audience_March2025_withUID  a LEFT OUTER JOIN UID2_INTEG_UID_SH.UID.SALT_BUCKETS b
  on a.BUCKET_ID=b.BUCKET_ID


 

--This last query compares last retrieved date to last salt bucket Id rotation to show you the UID2 that need to be regenerated
--A good way to remember this is: Whenever UID2 retrieved date is OLDER than last bucket Id rotation, then UID2 needs to be regenerated
select a.*, b.LAST_SALT_UPDATE_UTC
  from UID_Test_Audience_March2025_withUID_withRetrieved a LEFT OUTER JOIN UID2_INTEG_UID_SH.UID.SALT_BUCKETS b
  on a.BUCKET_ID=b.BUCKET_ID
  where a.Last_Retrieved_date < b.LAST_SALT_UPDATE_UTC or a.UID2 IS NULL;
  

  
  
---to see results of the query when the uid2 does not need to be generated, change where clause to: where a.Last_Retrieved_date < b.LAST_SALT_UPDATE_UTC or a.UID2 IS NOT NULL; -- this just shows you full results to populate the columns
--where you should see that last_retrieved is NEWER than last_salt_update
  
    