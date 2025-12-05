import nodemailer from 'nodemailer';

// Create a transporter object using Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Create reservation confirmation email HTML
const createReservationEmailHTML = (reservation) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .reservation-details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin-bottom: 10px; }
        .label { font-weight: bold; color: #555; }
        .footer { text-align: center; margin-top: 30px; color: #777; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Boho Bistro Restaurant</h1>
          <h2>Reservation Confirmation</h2>
        </div>
        
        <div class="content">
          <p>Dear ${reservation.name},</p>
          
          <p>Thank you for choosing Boho Bistro! Your reservation has been successfully confirmed.</p>
          
          <div class="reservation-details">
            <div class="detail-row">
              <span class="label">Reservation ID:</span> ${reservation._id}
            </div>
            <div class="detail-row">
              <span class="label">Date:</span> ${reservation.date}
            </div>
            <div class="detail-row">
              <span class="label">Time:</span> ${reservation.time}
            </div>
            <div class="detail-row">
              <span class="label">Number of Guests:</span> ${reservation.people}
            </div>
            <div class="detail-row">
              <span class="label">Status:</span> ${reservation.status || 'Confirmed'}
            </div>
          </div>
          
          <p><strong>Location:</strong><br>
          123 Restaurant Street, Food City, FC 12345<br>
          Phone: (123) 456-7890
          </p>
          
          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>Please arrive 5-10 minutes before your reservation time</li>
            <li>We can hold your table for up to 15 minutes past your reservation time</li>
            <li>For any changes or cancellations, please contact us at (123) 456-7890</li>
            <li>${reservation.specialRequests ? `Your special request: "${reservation.specialRequests}" has been noted.` : ''}</li>
          </ul>
          
          <p>We look forward to serving you!</p>
          
          <p>Best regards,<br>
          The Boho Bistro Team</p>
        </div>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Boho Bistro Restaurant. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send reservation confirmation email
export const sendReservationConfirmation = async (reservation) => {
  try {
    // Create transporter
    const transporter = createTransporter();
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: reservation.email,
      subject: `Boho Bistro - Reservation Confirmation #${reservation._id}`,
      html: createReservationEmailHTML(reservation),
      text: `Dear ${reservation.name},\n\nThank you for choosing Boho Bistro! Your reservation for ${reservation.people} people on ${reservation.date} at ${reservation.time} has been confirmed.\n\nReservation ID: ${reservation._id}\n\nWe look forward to serving you!\n\nBest regards,\nThe Boho Bistro Team`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Reservation confirmation email sent to: ${reservation.email}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error sending reservation email:', error);
    return false;
  }
};

// Send admin notification about new reservation
export const sendNewReservationNotification = async (reservation) => {
  try {
    const adminEmail = process.env.EMAIL_USER; // Send to restaurant email
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: `📋 New Reservation - ${reservation.name} - ${reservation.date} at ${reservation.time}`,
      html: `
        <h2>New Reservation Alert</h2>
        <p><strong>Customer:</strong> ${reservation.name}</p>
        <p><strong>Email:</strong> ${reservation.email}</p>
        <p><strong>Phone:</strong> ${reservation.phone}</p>
        <p><strong>Date:</strong> ${reservation.date}</p>
        <p><strong>Time:</strong> ${reservation.time}</p>
        <p><strong>Guests:</strong> ${reservation.people}</p>
        <p><strong>Special Requests:</strong> ${reservation.specialRequests || 'None'}</p>
        <p><strong>Reservation ID:</strong> ${reservation._id}</p>
        <br>
        <p><a href="http://localhost:3000/admin/reservations">View in Dashboard</a></p>
      `,
      text: `New reservation from ${reservation.name} (${reservation.email}, ${reservation.phone}) for ${reservation.people} people on ${reservation.date} at ${reservation.time}. Special requests: ${reservation.specialRequests || 'None'}`
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin notification sent for reservation: ${reservation._id}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    return false;
  }
};

// Test email connection
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    
    // Verify connection configuration
    await transporter.verify();
    console.log('✅ Email server is ready to send messages');
    
    // Send a test email
    const testMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: 'Boho Bistro - Email Service Test',
      text: 'This is a test email from Boho Bistro backend. If you receive this, email service is working correctly!'
    };
    
    const info = await transporter.sendMail(testMailOptions);
    console.log(`✅ Test email sent: ${info.messageId}`);
    
    return true;
  } catch (error) {
    console.error('❌ Email connection test failed:', error);
    return false;
  }
};