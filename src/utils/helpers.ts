export function formatName(
  fullName: string,
  maxLengthEach: number = 10,
  maxLengthTotal: number = 18
) {
  const firstName = fullName?.split(" ")[0];
  const lastName = fullName?.split(" ")[1];

  const fName =
    firstName?.length > maxLengthEach ? firstName.at(0).concat(".") : firstName;

  let lName =
    lastName?.length > maxLengthEach ? lastName.at(0).concat(".") : lastName;
  if (fName?.concat(lName)?.length > maxLengthTotal)
    lName = lastName.at(0).concat(".");

  return { fName, lName };
}

export function formatEmail(email: string, maxLength: number = 30) {
  const emailAddress =
    email?.length > maxLength
      ? `${email.slice(0, 3)}...${email.slice(email.indexOf("@"))}`
      : email || "";

  return emailAddress;
}
