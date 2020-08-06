export const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export const stripStrings = (str) => str.replace(/(<([^>]+)>)/ig,"");

export const linesToBreaks = (str) => str.replace(/(?:\r\n|\r|\n)/g, '<br>');

export const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}