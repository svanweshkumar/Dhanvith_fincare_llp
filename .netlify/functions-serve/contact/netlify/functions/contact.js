var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/contact.ts
var contact_exports = {};
__export(contact_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(contact_exports);
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};
var handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ""
    };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }
  try {
    const { name, phone, email, service, message } = JSON.parse(event.body || "{}");
    if (!name || !phone) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Name and Phone are required." })
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
        })
      };
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "noreply@dhanvithfincare.com",
        to: ["dhanvithfincare@gmail.com"],
        reply_to: email || void 0,
        subject: `New Enquiry: ${service} \u2014 ${name} (${phone})`,
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
        `
      })
    });
    const data = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true, data })
      };
    } else {
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: data })
      };
    }
  } catch (error) {
    console.error("Error in contact function:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=contact.js.map
