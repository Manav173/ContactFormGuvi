document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;

    contactForm.addEventListener('submit', async (event: Event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData: { name: string; email: string; contact: string; subject: string; message: string; } = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            contact: (document.getElementById('contact') as HTMLInputElement).value,
            subject: (document.getElementById('subject') as HTMLInputElement).value,
            message: (document.getElementById('message') as HTMLTextAreaElement).value
        };

        // Perform form validation
        if (!validateForm(formData)) {
            alert('Please fill out all required fields correctly.');
            return;
        }

        try {
            // Send form data using HTTP POST to MockAPI endpoint
            const response = await fetch('https://67168e7f3fcb11b265d2e516.mockapi.io/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                // Optional: Reset form after successful submission
                contactForm.reset();
            } else {
                throw new Error('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    });
});

// Function to validate form inputs
function validateForm(formData: { name: string; email: string; contact: string; subject: string; message: string; }): boolean {
    const { name, email, contact, subject, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !emailRegex.test(email) || !phoneRegex.test(contact) || !subject || !message) {
        return false;
    }

    return true;
}
