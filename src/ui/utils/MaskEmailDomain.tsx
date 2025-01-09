{/* Mask Email Function */}
const maskEmailDomain = (email: string): string => {
    const [localPart, domain] = email.split('@');
    if (!domain) return email; // Handle invalid email cases.
    const maskedDomain = domain.replace(/[^.]/g, '*'); // Replace all non-dot characters with '*'.
    return `${localPart}@${maskedDomain}`;
};


export default maskEmailDomain;