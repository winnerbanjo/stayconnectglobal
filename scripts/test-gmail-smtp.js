async function testMailtrapLogin() {
  console.log("Testing Mailtrap API authentication with technile0@gmail.com...");
  const authHeader = "Basic " + Buffer.from("technile0@gmail.com:@Stephen6145").toString("base64");

  try {
    const res = await fetch("https://mailtrap.io/api/v1/inboxes", {
      headers: {
        "Authorization": authHeader,
      },
    });
    const json = await res.json();
    console.log("Basic Auth Response Status:", res.status, json);
  } catch (err) {
    console.log("Basic Auth Error:", err.message);
  }
}

testMailtrapLogin();
