import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form via Resend
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone are required." });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set.");
      // For demo purposes, we'll simulate success if key is missing but log it
      return res.status(200).json({ success: true, message: "Demo mode: Email would be sent if API key was configured." });
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Dhanvith Fincare Website <onboarding@resend.dev>",
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
        res.json({ success: true, data });
      } else {
        res.status(response.status).json({ error: data });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
