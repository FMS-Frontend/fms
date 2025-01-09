
{/* Mask Phone Number Function */}
const maskPhoneNumber = (phoneNumber: string): string => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      console.warn("Invalid phone number format");
      return phoneNumber;
    }
    return phoneNumber.replace(/(\d{3})\d{5}(\d{2})/, "$1*****$2");
};




export default maskPhoneNumber;