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
    // console.log(chunk);
    entry.publish();
  }
}

async function rowToEntry(env, row) {
  const date = new Date(row['Publish (or Start Date)'])
  const title = row['Title'];
  const category = row['Type of Content'];
  const quote = row['Biblio Annotation'];
  const author = row['Author(s)']
  const url = row['URL']

  // console.log(date.toISOString());

  // console.log(`
  //   ${title}
  //   ${category}
  //   ${quote}
  // `);

  return await env.createEntry('timelineDocument', {
    fields: {
      date: {
        'en-US': date.toISOString()
      },
      title: {
        'en-US': title
      },
      author: {
        'en-US': author
      },
      quote: {
        'en-US': quote
      },
      url: {
        'en-US': url
      }
    }
  })
}

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

main().catch(console.error)