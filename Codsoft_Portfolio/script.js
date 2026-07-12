document.addEventListener('DOMContentLoaded', () => {
    
    // --- PART A: MOBILE RESPONSIVE NAVIGATION MENU TOGGLE ---
    const hamburgerBtn = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerBtn.addEventListener('click', () => {
        const isOpened = navMenu.classList.toggle('mobile-visible');
        
        const icon = hamburgerBtn.querySelector('i');
        if (isOpened) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-visible');
            hamburgerBtn.querySelector('i').className = 'fas fa-bars';
        });
    });


    // --- PART B: CLIENT-SIDE CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('portfolioContactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents page reload protocols

        const nameField = document.getElementById('userName');
        const emailField = document.getElementById('userEmail');
        const messageField = document.getElementById('userMessage');

        let formIsCorrect = true;

        clearFieldValidityState(nameField, 'nameErrorMsg');
        clearFieldValidityState(emailField, 'emailErrorMsg');
        clearFieldValidityState(messageField, 'messageErrorMsg');

        // 1. Evaluate Name field
        if (nameField.value.trim() === '') {
            setFieldInvalidState(nameField, 'nameErrorMsg', 'Full Name is required and cannot be empty.');
            formIsCorrect = false;
        }

        // 2. Evaluate Email field format layout
        const emailValue = emailField.value.trim();
        const structuralEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            setFieldInvalidState(emailField, 'emailErrorMsg', 'An email address is required to follow up.');
            formIsCorrect = false;
        } else if (!structuralEmailRegex.test(emailValue)) {
            setFieldInvalidState(emailField, 'emailErrorMsg', 'Please provide a valid email format (e.g., name@domain.com).');
            formIsCorrect = false;
        }

        // 3. Evaluate Message field length
        if (messageField.value.trim() === '') {
            setFieldInvalidState(messageField, 'messageErrorMsg', 'Message text content field cannot be blank.');
            formIsCorrect = false;
        }

        // Action block executed following pristine parameters check
        if (formIsCorrect) {
            // Get the button to show a loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending Message...";
            submitBtn.disabled = true;

            // Collect all the form data into a structured object
            const formData = new FormData(contactForm);

            // Send the actual data to Web3Forms in the background
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status === 200) {
                    // Success! Display a seamless notification to the user
                    alert('Thank you! Your message has been sent successfully straight to my inbox.');
                    contactForm.reset();
                } else {
                    // Log handling if the API returns an error status
                    alert('Something went wrong: ' + res.message);
                }
            })
            .catch(error => {
                // Catch network connectivity errors
                console.log(error);
                alert('Network error. Please try again later.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        }
    });

    function setFieldInvalidState(inputElement, errorElementId, messageText) {
        const parentContainer = inputElement.parentElement;
        const errorFeedbackLabel = document.getElementById(errorElementId);
        
        parentContainer.classList.add('invalid-state');
        errorFeedbackLabel.innerText = messageText;
    }

    function clearFieldValidityState(inputElement, errorElementId) {
        const parentContainer = inputElement.parentElement;
        const errorFeedbackLabel = document.getElementById(errorElementId);
        
        parentContainer.classList.remove('invalid-state');
        errorFeedbackLabel.innerText = '';
    }


    // --- PART C: HEADER DARK / LIGHT THEME TOGGLE INTERACTION ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    themeToggleBtn.addEventListener('click', () => {
        const isDarkNow = document.body.classList.toggle('dark-theme-active');
        const btnIcon = themeToggleBtn.querySelector('i');
        
        if (isDarkNow) {
            btnIcon.className = 'fas fa-sun';
        } else {
            btnIcon.className = 'fas fa-moon';
        }
    });
});