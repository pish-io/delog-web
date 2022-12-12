import { marked } from 'marked';

export default new (class {
  getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] === 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      }
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      else if ((i === key && obj[i] === val) || (i === key && val === '')) {
        //
        objects.push(obj);
      } else if (obj[i] === val && key === '') {
        //only add if the object is not already in the array
        if (objects.lastIndexOf(obj) === -1) {
          objects.push(obj);
        }
      }
    }
    return objects;
  }

  getPlainText(body) {
    const lexer = marked.lexer(body);
    let tempText = '';
    for (const lexitem of lexer) {
      const find = this.getObjects(lexitem, 'type', 'text');
      if (find.length && find[0].text) {
        if (!find[0].text.includes('http')) {
          find[0].text = find[0].text.replace(/&amp;/g, '&');
          find[0].text = find[0].text.replace(/&#39;/g, "'");
          find[0].text = find[0].text.replace(/&quot;/g, '"');
          tempText += find[0].text;
        }
      }
    }
    return tempText;
  }

  getHtmlText(body) {
    const renderer = {
      heading(text, level) {
        let className = 'text-3xl';
        switch (level) {
          case 1:
            className = 'text-5xl';
            break;
          case 2:
            className = 'text-4xl';
            break;
          case 3:
            className = 'text-3xl';
            break;
          case 4:
            className = 'text-2xl';
            break;
          case 5:
            className = 'text-xl';
            break;
          default:
            break;
        }
        return `<h${level} class="mt-5 mb-3 font-medium ${className}">${text}</h${level}>`;
      },

      paragraph(text) {
        text = text.replace('\n', '<br>');
        return `<p class="text-lg mt-5">${text}</p>`;
      },

      html(html) {
        if (html.includes('<center>') || html.includes('<Center>')) {
          let newHtml = html.replace('<center>', '');
          newHtml = newHtml.replace('</center>', '');
          newHtml = newHtml.replace('<Center>', '');
          newHtml = newHtml.replace('</Center>', '');
          // console.log(newHtml);
          return marked.parse(newHtml);
        }
        return `<p>${html}</p>`;
      },

      link(href, title, text) {
        // console.log(href, title, text);
        if (href.includes('webp')) {
          return `<img src="${href}"></img>`;
        } else if (href.includes('.png') || href.includes('.jpg')) {
          return `<img src="${href}"></img>`;
        } else if (href.includes('.gif')) {
          return `<img src="${href}"></img>`;
        } else {
          return `<a class="text-blue-500 break-all" href="${href}">${href}</a>`;
        }
      },
      // image(href, title, text) {
      //   console.log(href, title, text);
      //   return `<img class="object-scale-down" src="${href}"></img>`;
      // },
      // object-scale-down
    };

    marked.use({ renderer });
    // const lexer = marked.lexer(body);
    // console.log(lexer);

    const parse = marked.parse(body);
    return parse;
  }
})();
