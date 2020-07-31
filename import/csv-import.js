const fs = require('fs');
const Parser = require('csv-parse');
const contentful = require('contentful-management');

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function main () {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
  const environment = await space.getEnvironment('development')
  const parser = new Parser({delimiter: ',', columns: true, bom: true});
  const readStream = fs.createReadStream('./import/sample-data.csv').pipe(parser);

  for await (const chunk of readStream) {
    const entry = await rowToEntry(environment, chunk)
    // console.log(chunk['First Name']);
    entry.publish();
  }
}

async function rowToEntry(env, row) {
  
  const firstName = capitalize_Words(row['First Name'].trim().toLowerCase());
  const lastName = capitalize_Words(row['Last Name'].trim().toLowerCase());
  const email = row['Electronic Address'].trim().toLowerCase();

  console.log(`${firstName}, ${lastName}, ${email}`);

  return await env.createEntry('visitor', {
    fields: {
      firstName: {
        'en-US': firstName
      },
      lastName: {
        'en-US': lastName
      },
      email: {
        'en-US': email
      },
      active: {
        'en-US': false
      }
    }
  })
}

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

main().catch(console.error)