import type { Context } from "hono";

export default async (c: Context) => {
  try {
    const body = await c.req.json();
    const { contact } = body;
    
    if (!contact) {
      return c.json({ error: "Contact information required" }, 400);
    }
    
    // Determine if contact is email or phone
    const isEmail = contact.includes('@');
    const contactType = isEmail ? 'email' : 'phone';
    
    // Log the investor interest (in production, you'd save to a database)
    console.log("Investor interest:", { contact, type: contactType, timestamp: new Date().toISOString() });
    
    // Send email to the FarmSense team about new investor lead
    const notifyRes = await fetch("https://api.zo.computer/zo/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.ZO_CLIENT_IDENTITY_TOKEN || "",
      },
      body: JSON.stringify({
        input: `A new investor has requested the FarmSense deck.\n\n${contactType.charAt(0).toUpperCase() + contactType.slice(1)}: ${contact}\n\nSend an email to getfarmsense@gmail.com with the subject "New Investor Lead" and include their contact details. Also send a text to +17196289482 with a brief notification.`,
        model_name: "openrouter:z-ai/glm-5",
      }),
    });
    
    return c.json({ success: true, message: "Request received" });
  } catch (err) {
    console.error("Investor interest error:", err);
    return c.json({ error: "Failed to process request" }, 500);
  }
};
