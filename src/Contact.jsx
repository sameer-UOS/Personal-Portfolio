import { useState, useEffect } from "react";
import FormField from "./FormField";
import "./Contact.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpeyogk";

function Contact() {
  useEffect(() => {
    document.title = "Sameer | Contact";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Your Email",
      type: "email",
      placeholder: "Enter your email address",
    },
    {
      name: "message",
      label: "Your Message",
      type: "textarea",
      placeholder: "Write your message here...",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      setSuccess(
        "Message sent successfully! Thank you for contacting me."
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        "Unable to send your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-header">
        <span className="contact-subtitle">GET IN TOUCH</span>

        <h1 className="contact-title">Let's Connect</h1>

        <p className="contact-description">
          Have a question, suggestion, or just want to say hello?
          I'd be happy to hear from you. Send me a message below.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-intro">
          <div className="contact-intro-icon">
            ✉
          </div>

          <h2>Start a Conversation</h2>

          <p>
            I'm always interested in connecting with people,
            discussing ideas, and learning about new opportunities.
          </p>

          <div className="contact-note">
            <span className="contact-note-dot"></span>
            <span>Send me a message using the contact form.</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Me a Message</h2>

          <p className="contact-form-description">
            Fill in the details and I'll receive your message.
          </p>

          {fields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          ))}

          <button
            className="contact-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Message..." : "Send Message →"}
          </button>

          {error && (
            <p className="contact-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="contact-success" role="status">
              {success}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;