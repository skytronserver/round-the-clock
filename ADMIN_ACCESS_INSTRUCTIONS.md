# Admin Access Instructions for Reports Dashboard

## How to Access the Reports Page

1. **Login Credentials**:
   - **Password**: `rtc2024admin`
   - Enter this password on the login screen to access the reports dashboard

2. **Features Available**:
   - View business overview and analytics
   - Monitor all customer orders
   - Review customer feedback from QR code submissions
   - Export data to CSV files
   - Generate daily reports
   - Manage order statuses

3. **Security Notes**:
   - The session expires when you close the browser
   - Use the "Logout" button in the top-right corner when finished
   - Only share these credentials with authorized personnel

## For the Business Owner

### To Change the Password:
1. Open the file: `src/components/AdminLogin.tsx`
2. Find the line: `const ADMIN_PASSWORD = 'rtc2024admin';`
3. Change `'rtc2024admin'` to your desired password
4. Save the file and redeploy your application

### Alternative Security Options:
If you need more advanced security, consider:
- Adding user accounts with different access levels
- Implementing time-based access tokens
- Adding IP address restrictions
- Setting up two-factor authentication

---

**Important**: Keep these credentials secure and only share with trusted individuals who need access to business reports and customer data.
