
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
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Enter your message",
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

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      setError("Please configure your Formspree endpoint first.");
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

      setSuccess("Message sent successfully! Thank you for contacting me.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setError(
        "Unable to send your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <h1 className="contact-title">Contact Me</h1>
      <p className="contact-description">
        Have a question or project in mind? Send me a message.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
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
          {isSubmitting ? "Sending..." : "Send Message"}
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
  );
}

export default Contact;