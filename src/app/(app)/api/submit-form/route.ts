import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, message } = body;

    // Log the received data
    console.log('Received form data:', { name, company, email, phone, message });

    // Verify environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      throw new Error('GOOGLE_CLIENT_EMAIL is not configured');
    }
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('GOOGLE_PRIVATE_KEY is not configured');
    }
    if (!process.env.GOOGLE_SHEETS_ID) {
      throw new Error('GOOGLE_SHEETS_ID is not configured');
    }

    console.log('Environment variables verified');

    // Create JWT client using service account credentials
    const client = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('JWT client created');

    const sheets = google.sheets({ version: 'v4', auth: client });
    console.log('Sheets client created');

    // Prepare the values to be inserted
    const values = [
      [
        new Date().toISOString(),
        name,
        company || 'N/A',
        email,
        phone || 'N/A',
        message,
      ],
    ];

    console.log('Attempting to append values to sheet');

    // Append values to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:F', // Adjust range according to your sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Successfully appended values to sheet:', response.data);

    return new Response(
      JSON.stringify({ 
        message: 'Data successfully saved to Google Sheets',
        debug: response.data 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Detailed error logging
    console.error('Detailed Google Sheets API Error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(
      JSON.stringify({ 
        error: 'Failed to save data to Google Sheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}