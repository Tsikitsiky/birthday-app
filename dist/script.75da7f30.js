// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"handlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClicks = void 0;

var _script = require("./script.js");

//handle clicks
var handleClicks = function handleClicks(e) {
  if (e.target.closest('button.edit')) {
    var article = e.target.closest('article');
    var id = article.dataset.id;
    (0, _script.editPeople)(id);
  }

  if (e.target.closest('button.delete')) {
    var _article = e.target.closest('article');

    var _id = _article.dataset.id;
    (0, _script.deletePeople)(_id);
  }
};

exports.handleClicks = handleClicks;
},{"./script.js":"script.js"}],"elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterForm = exports.filterMonthInput = exports.filterNameInput = exports.addBtn = exports.main = void 0;
var main = document.querySelector('main');
exports.main = main;
var addBtn = document.querySelector('.add');
exports.addBtn = addBtn;
var filterNameInput = document.querySelector('#filter-name');
exports.filterNameInput = filterNameInput;
var filterMonthInput = document.querySelector('#filter-birthMonth');
exports.filterMonthInput = filterMonthInput;
var filterForm = document.querySelector('.filter-form');
exports.filterForm = filterForm;
},{}],"libs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// this function fetches all the people
function fetchData() {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('./people.json');

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            localStorage.setItem('peopleBirthday', JSON.stringify(data));
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchData.apply(this, arguments);
}
},{}],"svg.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trash = exports.edit = exports.birthdayCake = void 0;
var birthdayCake = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>';
exports.birthdayCake = birthdayCake;
var edit = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"100\" height=\"100\">\n<path d=\"M77.926,94.924H8.217C6.441,94.924,5,93.484,5,91.706V21.997c0-1.777,1.441-3.217,3.217-3.217h34.854 c1.777,0,3.217,1.441,3.217,3.217s-1.441,3.217-3.217,3.217H11.435v63.275h63.274V56.851c0-1.777,1.441-3.217,3.217-3.217 c1.777,0,3.217,1.441,3.217,3.217v34.855C81.144,93.484,79.703,94.924,77.926,94.924z\"/>\n<path d=\"M94.059,16.034L84.032,6.017c-1.255-1.255-3.292-1.255-4.547,0l-9.062,9.073L35.396,50.116 c-0.29,0.29-0.525,0.633-0.686,1.008l-7.496,17.513c-0.526,1.212-0.247,2.617,0.676,3.539c0.622,0.622,1.437,0.944,2.274,0.944 c0.429,0,0.858-0.086,1.276-0.257l17.513-7.496c0.375-0.161,0.719-0.397,1.008-0.686l35.026-35.026l9.073-9.062 C95.314,19.326,95.314,17.289,94.059,16.034z M36.286,63.79l2.928-6.821l3.893,3.893L36.286,63.79z M46.925,58.621l-5.469-5.469 L73.007,21.6l5.47,5.469L46.925,58.621z M81.511,24.034l-5.469-5.469l5.716-5.716l5.469,5.459L81.511,24.034z\"/>\n</svg>";
exports.edit = edit;
var trash = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg\n   xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n   xmlns:cc=\"http://creativecommons.org/ns#\"\n   xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n   xmlns:svg=\"http://www.w3.org/2000/svg\"\n   xmlns=\"http://www.w3.org/2000/svg\"\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n   viewBox=\"0 -256 1792 1792\"\n   id=\"svg3741\"\n   version=\"1.1\"\n   inkscape:version=\"0.48.3.1 r9886\"\n   width=\"100%\"\n   height=\"100%\"\n   sodipodi:docname=\"trash_font_awesome.svg\">\n  <metadata\n     id=\"metadata3751\">\n    <rdf:RDF>\n      <cc:Work\n         rdf:about=\"\">\n        <dc:format>image/svg+xml</dc:format>\n        <dc:type\n           rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n      </cc:Work>\n    </rdf:RDF>\n  </metadata>\n  <defs\n     id=\"defs3749\" />\n  <sodipodi:namedview\n     pagecolor=\"#ffffff\"\n     bordercolor=\"#666666\"\n     borderopacity=\"1\"\n     objecttolerance=\"10\"\n     gridtolerance=\"10\"\n     guidetolerance=\"10\"\n     inkscape:pageopacity=\"0\"\n     inkscape:pageshadow=\"2\"\n     inkscape:window-width=\"640\"\n     inkscape:window-height=\"480\"\n     id=\"namedview3747\"\n     showgrid=\"false\"\n     inkscape:zoom=\"0.13169643\"\n     inkscape:cx=\"896\"\n     inkscape:cy=\"896\"\n     inkscape:window-x=\"0\"\n     inkscape:window-y=\"25\"\n     inkscape:window-maximized=\"0\"\n     inkscape:current-layer=\"svg3741\" />\n  <g\n     transform=\"matrix(1,0,0,-1,197.42373,1255.0508)\"\n     id=\"g3743\">\n    <path\n       d=\"M 512,800 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z M 1152,76 v 948 H 256 V 76 Q 256,54 263,35.5 270,17 277.5,8.5 285,0 288,0 h 832 q 3,0 10.5,8.5 7.5,8.5 14.5,27 7,18.5 7,40.5 z M 480,1152 h 448 l -48,117 q -7,9 -17,11 H 546 q -10,-2 -17,-11 z m 928,-32 v -64 q 0,-14 -9,-23 -9,-9 -23,-9 h -96 V 76 q 0,-83 -47,-143.5 -47,-60.5 -113,-60.5 H 288 q -66,0 -113,58.5 Q 128,-11 128,72 v 952 H 32 q -14,0 -23,9 -9,9 -9,23 v 64 q 0,14 9,23 9,9 23,9 h 309 l 70,167 q 15,37 54,63 39,26 79,26 h 320 q 40,0 79,-26 39,-26 54,-63 l 70,-167 h 309 q 14,0 23,-9 9,-9 9,-23 z\"\n       id=\"path3745\"\n       inkscape:connector-curvature=\"0\"\n       style=\"fill:currentColor\" />\n  </g>\n</svg>\n";
exports.trash = trash;
},{}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePeople = exports.editPeople = void 0;

var _handlers = require("./handlers.js");

var _elements = require("./elements.js");

var _libs = require("./libs.js");

var _svg = require("./svg.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var people = []; //get the array from ls

var initLocalStorage = function initLocalStorage() {
  var stringFromLs = localStorage.getItem('peopleBirthday');
  var lsItems = JSON.parse(stringFromLs);

  if (lsItems) {
    people = lsItems;
  } else {
    (0, _libs.fetchData)();
  } //populateTheList();


  dispatchEvent(new CustomEvent('pleaseUpdate'));
};

initLocalStorage();

var updateLs = function updateLs() {
  localStorage.setItem('peopleBirthday', JSON.stringify(people));
}; //filter
// const filterList = e => {
//     populateTheList(e,filterNameInput.value, filterMonthInput.value)
// };


function populateTheList() {
  //const peopleSorted = people.sort((person1, person2) => person2.birthday - person1.birthday);
  if (_elements.filterNameInput.value !== '') {
    people = people.filter(function (person) {
      var lowercaseFirstName = person.firstName.toLowerCase();
      var lowercaseLastName = person.lastName.toLowerCase();

      var lowercaseFilter = _elements.filterNameInput.value.toLowerCase();

      if (lowercaseFirstName.includes(lowercaseFilter) || lowercaseLastName.includes(lowercaseFilter)) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (_elements.filterMonthInput.value !== '') {
    //console.log(filterMonth)
    people = people.filter(function (person) {
      return new Date(person.birthday).getMonth() == _elements.filterMonthInput.value;
    });
  }

  var html = people.map(function (person) {
    //manage the dates
    var age = new Date().getFullYear() - new Date(person.birthday).getFullYear();
    var brtDate = new Date(person.birthday).getDate();
    var date;
    var month;

    if (brtDate > 3) {
      date = "".concat(brtDate, "th");
    }

    switch (brtDate % 10) {
      case 1:
        date = "".concat(brtDate, "st");
        break;

      case 2:
        date = "".concat(brtDate, "nd");
        break;

      case 3:
        date = "".concat(brtDate, "rd");
    }

    ;
    var brtMonth = new Date(person.birthday).getMonth();

    switch (brtMonth) {
      case 0:
        month = "January";
        break;

      case 1:
        month = "February";
        break;

      case 2:
        month = "March";
        break;

      case 3:
        month = "April";
        break;

      case 4:
        month = "May";
        break;

      case 5:
        month = "June";
        break;

      case 6:
        month = "July";
        break;

      case 7:
        month = "August";
        break;

      case 8:
        month = "September";
        break;

      case 9:
        month = "October";
        break;

      case 10:
        month = "November";
        break;

      case 11:
        month = "December";
    }

    ;
    var oneDay = 24 * 60 * 60 * 1000;
    var today = new Date();
    var year;

    if (today.getMonth() > brtMonth) {
      year = today.getFullYear() + 1;
    } else if (today.getMonth() === brtMonth && today.getDate() > brtDate) {
      year = today.getFullYear();
    } else {
      year = today.getFullYear();
    }

    var birthDay = new Date(year, brtMonth, brtDate); // To Calculate next year's birthday if passed already. 

    if (today.getMonth() === brtMonth && today.getDate() > brtDate) {
      birthDay.setFullYear(birthDay.getFullYear() + 1);
      age = new Date().getFullYear() + 1 - new Date(person.birthday).getFullYear(); //console.log(new Date(birthDay.setFullYear(birthDay.getFullYear())))
    }

    ; // To Calculate the result in milliseconds and then converting into days 

    var daysLeft = Math.round(Math.abs((new Date(birthDay) - new Date(today)) / oneDay));
    return "\n        <article data-id=\"".concat(person.id, "\">\n            <img src=\"").concat(person.picture, "\" alt=\"").concat(person.firstName, " ").concat(person.lastName, "\">\n            <p>").concat(person.firstName, " ").concat(person.lastName, " <br> ").concat(daysLeft === 0 ? "Today is ".concat(person.firstName, "'s birthday") : "Turns ".concat(age, " on ").concat(date, " ").concat(month), "</p>\n            <p>").concat(daysLeft === 0 ? "".concat(_svg.birthdayCake, " ").concat(_svg.birthdayCake, " ").concat(_svg.birthdayCake) : "".concat(_svg.birthdayCake, "\n            in ").concat(daysLeft, " days"), "</p>\n            <p>\n                <button class=\"edit\">\n                    <img src=\"../assets/edit.svg\">\n                </button>\n            </p>\n            <p>\n                <button class=\"delete\">\n                    <img src=\"../assets/trash.svg\">\n                </button>\n            </p>\n        </article>\n        ");
  }).sort(function (person1, person2) {
    return person2.daysLeft - person1.daysLeft;
  });
  _elements.main.innerHTML = html.join('');
} //destroy popup


function destroyPopup(_x) {
  return _destroyPopup.apply(this, arguments);
} //add a person to the list


function _destroyPopup() {
  _destroyPopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(popup) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            popup.classList.remove('open'); //remove the popup from the DOM

            popup.remove(); //remove from the javascript memory

            popup = null;

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _destroyPopup.apply(this, arguments);
}

function addPeople() {
  var addForm = document.createElement('form');
  addForm.classList.add('popup');
  addForm.innerHTML = "\n    <div>\n\t\t<fieldset>\n            <label>Last name</label>\n            <input type=\"text\" name=\"lastName\">\n\t\t</fieldset>\n\t\t<fieldset>\n            <label>First name</label>\n            <input type=\"text\" name=\"firstName\">\n        </fieldset>\n        <fieldset>\n            <label>Birthday</label>\n            <input type=\"date\" name=\"birthday\">\n        </fieldset>\n        <fieldset>\n            <label>Picture</label>\n            <input type=\"url\" name=\"picture\">\n        </fieldset>\n        <button type=\"submit\">Save</button>\n        <button type=\"button\" name=\"cancel\" class=\"cancel\">Cancel</button>\n    </div>\n    "; //listen to submit

  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var newPerson = {
      id: Date.now(),
      lastName: addForm.lastName.value,
      firstName: addForm.firstName.value,
      picture: "https://s3.amazonaws.com/uifaces/faces/twitter/jpenico/128.jpg",
      birthday: addForm.birthday.value
    }; //console.log(newPerson);

    people.unshift(newPerson); //console.log(people);

    destroyPopup(addForm);

    _elements.main.dispatchEvent(new CustomEvent('pleaseUpdate'));

    populateTheList();
  }); //cancel

  if (addForm.cancel) {
    addForm.cancel.addEventListener('click', function () {
      destroyPopup(addForm);
    }, {
      once: true
    });
  }

  document.body.appendChild(addForm);
  addForm.classList.add('open');
}

var editPeople = function editPeople(id) {
  var personToEdit = people.find(function (person) {
    return person.id === id || person.id === Number(id);
  }); //console.log(personToEdit);

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var editForm;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              editForm = document.createElement('form');
              editForm.classList.add('popup');
              editForm.innerHTML = "\n        \n        <div>\n            <fieldset>\n                <label>Last name</label>\n                <input type=\"text\" name=\"lastName\" value=\"".concat(personToEdit.lastName, "\">\n            </fieldset>\n            <fieldset>\n                <label>First name</label>\n                <input type=\"text\" name=\"firstName\" value=\"").concat(personToEdit.firstName, "\">\n            </fieldset>\n            <fieldset>\n                <label>Birthday</label>\n                <input type=\"text\" name=\"birthday\" value=\"").concat(new Date(personToEdit.birthday), "\">\n            </fieldset>\n            <fieldset>\n                <label>Picture</label>\n                <input type=\"url\" name=\"picture\" value=\"").concat(personToEdit.picture, "\">\n            </fieldset>\n            <button type=\"submit\">Save</button>\n            <button type=\"button\" name=\"cancel\" class=\"cancel\">Cancel</button>\n        </div>\n        "); //save the edit

              editForm.addEventListener('submit', function (e) {
                e.preventDefault();
                personToEdit.lastName = editForm.lastName.value;
                personToEdit.firstName = editForm.firstName.value;
                personToEdit.birthday = editForm.birthday.value;
                personToEdit.picture = editForm.picture.value;
                populateTheList();
                destroyPopup(editForm);

                _elements.main.dispatchEvent(new CustomEvent('pleaseUpdate'));
              }, {
                once: true
              }); //cancel

              if (editForm.cancel) {
                editForm.cancel.addEventListener('click', function () {
                  destroyPopup(editForm);
                  resolve(null);
                }, {
                  once: true
                });
              }

              document.body.appendChild(editForm);
              editForm.classList.add('open');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}; //delete a person 


exports.editPeople = editPeople;

var deletePeople = function deletePeople(id) {
  var personToDelete = people.find(function (person) {
    return person.id === id || person.id === Number(id);
  });
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
      var deletePopup;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              deletePopup = document.createElement('div');
              deletePopup.classList.add('popup');
              deletePopup.insertAdjacentHTML("afterbegin", "\n\t\t<div>\n\t\t\t<p>Are you sure to delete <bold>".concat(personToDelete.lastName, " ").concat(personToDelete.firstName, "</bold>?</p>\n\t\t\t<button class=\"yes\">Yes</button>\n\t\t\t<button class=\"cancel\">Cancel</button>\n\t\t</div>\n\t\t"));
              deletePopup.addEventListener('click', function (e) {
                if (e.target.matches('button.yes')) {
                  //people = people.filter(person => person.id !== id || person.id !== Number(id));
                  if (typeof id === "string") {
                    people = people.filter(function (person) {
                      return person.id !== Number(id);
                    });
                  }

                  people = people.filter(function (person) {
                    return person.id !== id;
                  });

                  _elements.main.dispatchEvent(new CustomEvent('pleaseUpdate'));

                  populateTheList();
                  destroyPopup(deletePopup);
                }

                if (e.target.matches('button.cancel')) {
                  destroyPopup(deletePopup);
                }
              });
              resolve();
              document.body.appendChild(deletePopup);
              deletePopup.classList.add('open');

              _elements.main.dispatchEvent(new CustomEvent('pleaseUpdate'));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());
}; //event listeners


exports.deletePeople = deletePeople;

_elements.filterNameInput.addEventListener('input', populateTheList);

_elements.filterMonthInput.addEventListener('change', populateTheList);

_elements.addBtn.addEventListener('click', addPeople);

_elements.main.addEventListener('pleaseUpdate', updateLs);

_elements.main.addEventListener('click', _handlers.handleClicks);

window.addEventListener('DOMContentLoaded', populateTheList);
},{"./handlers.js":"handlers.js","./elements.js":"elements.js","./libs.js":"libs.js","./svg.js":"svg.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55233" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map