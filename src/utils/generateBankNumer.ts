export const generateBankAccountNumber = () => {
  const bankCode = '001'; // Example bank code, replace with actual bank code if needed
  const accountType = Math.random() < 0.5 ? '01' : '02'; // Randomly choose between savings and checking account types
  const accountNumber = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0'); // Generate random 9-digit account number
  return `${bankCode}-${accountType}-${accountNumber}`;
};
