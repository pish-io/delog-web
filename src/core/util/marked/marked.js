import { marked } from 'marked';

export default new (class {
  getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      }
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      else if ((i == key && obj[i] == val) || (i == key && val === '')) {
        //
        objects.push(obj);
      } else if (obj[i] == val && key === '') {
        //only add if the object is not already in the array
        if (objects.lastIndexOf(obj) == -1) {
          objects.push(obj);
        }
      }
    }
    return objects;
  }

  getPlainText(body) {
    const lexer = marked.lexer(body);
    let tempList = [];
    for (const lexitem of lexer) {
      if (!lexitem.raw.includes('https://')) {
        const find = this.getObjects(lexitem, 'type', 'text');
        if (find.length && find[0].text) {
          tempList.push(find[0].text);
        }
      }
    }
    return tempList;
  }
})();
