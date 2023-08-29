import emailjs from "@emailjs/browser";
import getEmails from "./getEmails";
import changeNewsletter from "./changeNewsletter";


const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;

export default async function sendEmail(category, title) {
const categoryM = category.toLowerCase();

  changeNewsletter(title, categoryM, true);
  const emails = await getEmails();
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const templateParams = {
      category: category,
      toEmail: email,
      link: `<a href='http://localhost:3000/${category}/${title}'>kliknij tu</a>`,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.status, result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}

