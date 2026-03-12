import { Handler } from "@netlify/functions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export const handler: Handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { name, phone, email, service, message } = JSON.parse(event.body || "{}");

    if (!name || !phone) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Name and Phone are required." }),
      };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set.");
      return {
        headers: corsHeaders,
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: "Demo mode: Email would be sent if API key was configured." 
        }),
      };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "noreply@dhanvithfincare.com",
        to: ["dhanvithfincare@gmail.com"],
        reply_to: email || undefined,
        subject: `New Enquiry: ${service} — ${name} (${phone})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #00acc1;">New Website Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> <span style="color: #00acc1; font-weight: bold;">${phone}</span></p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Service:</strong> <span style="color: #00acc1; font-weight: bold;">${service}</span></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message || "No message provided."}</div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true, data }),
      };
    } else {
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: data }),
      };
    }
  } catch (error) {
    console.error("Error in contact function:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
