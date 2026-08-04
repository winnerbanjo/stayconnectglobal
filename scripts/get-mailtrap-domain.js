const TOKEN = "f8b86b71e617958e8126ec8c54a90162";

async function getMailtrapDetails() {
  console.log("Querying Mailtrap Account API...");

  // Endpoint 1: Accounts
  try {
    const res1 = await fetch("https://mailtrap.io/api/v1/accounts", {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const data1 = await res1.json();
    console.log("Accounts API:", res1.status, JSON.stringify(data1));

    if (Array.isArray(data1) && data1.length > 0) {
      const accountId = data1[0].id;
      console.log("Found Account ID:", accountId);

      // Endpoint 2: Sending Domains under account
      const resDomains = await fetch(`https://mailtrap.io/api/v1/accounts/${accountId}/sending_domains`, {
        headers: { "Authorization": `Bearer ${TOKEN}` }
      });
      const domainsData = await resDomains.json();
      console.log("Sending Domains API:", resDomains.status, JSON.stringify(domainsData));

      // Endpoint 3: Inboxes under account
      const resInboxes = await fetch(`https://mailtrap.io/api/v1/accounts/${accountId}/inboxes`, {
        headers: { "Authorization": `Bearer ${TOKEN}` }
      });
      const inboxesData = await resInboxes.json();
      console.log("Inboxes API:", resInboxes.status, JSON.stringify(inboxesData));
    }
  } catch (e) {
    console.error("Error querying Mailtrap API:", e);
  }
}

getMailtrapDetails();
