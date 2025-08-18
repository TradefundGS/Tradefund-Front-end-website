// utils/preferenceHandler.ts
export function formatInvestorDisplay(investor: any) {
  const preference = investor.preference || "Visible";
  const user = investor.user || {};

  let displayName = user.name || "Unknown";
  let displayAmount = investor.amount || 0;
  let displayImage = user.profile_image || null;

  switch (preference) {
    case "Visible":
      return {
        name: displayName,
        amount: displayAmount,
        image: displayImage,
      };
    case "Hide Name":
      return {
        name: "Anonymous",
        amount: displayAmount,
        image: null,
      };
    case "Hide Amount":
      return {
        name: displayName,
        amount: "Hidden",
        image: displayImage,
      };
    case "Anonymous":
      return {
        name: "Anonymous",
        amount: "Hidden",
        image: null,
      };
    default:
      return {
        name: displayName,
        amount: displayAmount,
        image: displayImage,
      };
  }
}
