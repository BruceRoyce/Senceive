export default
class SearchUser {
  // by bruce for Senceive tech demo
  error = false;
  caseSensitivity = {
    state: true,
    applyTo: function (item) { return this.state ? item : item.toLowerCase(); }
  };
  wildcard = {
    none: "none",
    start: "start",
    end: "end",
    middle: "middle"
  };

  constructor(wordsArray) {
    if (
      !wordsArray
      || typeof wordsArray === undefined
      || !Array.isArray(wordsArray)
      || wordsArray.length === 0
    ) this.error = "Bad array of words";
    this.dic = Array.from(new Set(wordsArray));
  }

  doesSearchForWildcard(word) {
    console.log("looking at the search keyphrase: " + this.caseSensitivity.applyTo(word));
    if (word.search(/\*/g) < 0) return this.wildcard.none;
    if (word.startsWith("*")) return this.wildcard.start;
    if (word.endsWith("*")) return this.wildcard.end;
    return this.wildcard.middle;
  }

  getSearchWordParts(word) {
    let returnable;
    const wildcard = this.doesSearchForWildcard(word);
    let parts = word.split("*");
    returnable = {
      type: wildcard,
      parts: parts.filter((part) => part.length > 0).map((part) => { this.caseSensitivity.applyTo(part) })
    };
    return returnable;
  }

  handleWildAtSides(wildcardPlacement, wildcardParts) {
    console.debug("! Doing sides");
    console.debug("placement: ", wildcardPlacement, "parts: ", wildcardParts);

    let result = [];
    wildcardParts.forEach((wildcard) => {
      this.dic.forEach((item) => {
        item = this.caseSensitivity.applyTo(item);
        if (
          (wildcardPlacement == this.wildcard.start && item.endsWith(wildcard))
          ||
          (wildcardPlacement == this.wildcard.end && item.startsWith(wildcard))
        )
          result.push(item);
      })
    });
    return result;
  }

  handleWildAtMiddle(wildcardParts) {
    console.debug("! Doing middle");
    let result = [];
    this.dic.forEach((item) => {
      item = this.caseSensitivity.applyTo(item);
      if (item.startsWith(wildcardParts[0]) && item.endsWith(wildcardParts[1])) result.push(item);
    });
    return result;
  }

  handleFullWordSearch(word) {
    console.debug("! Doing full word search");
    return this.dic.filter((item) => {
      item = this.caseSensitivity.applyTo(item);
      console.debug(" item", item);
      if (item == word) return item;
    });
  }

  handeleBooleanOnly(word) {
    console.debug("! Doing search for boolean-only results");
    if (this.doesSearchForWildcard(word) !== this.wildcard.none) {
      const regexTemplate = new RegExp(word.replaceAll("*", "."), "g");
      console.debug("regexTemplate: ", regexTemplate);
      return this.dic.some((item) => regexTemplate.test(this.caseSensitivity.applyTo(item)));
    } else {
      return this.dic.includes(word);
    }
  }

  search(word) {
    let result;
    const { type, parts } = this.getSearchWordParts(word);
    console.log("Wildcard Type: " + type);
    switch (type) {
      case this.wildcard.none:
        result = this.handleFullWordSearch(word);
        break;
      case this.wildcard.middle:
        result = this.handleWildAtMiddle(parts);
        break;
      case this.wildcard.start:
      case this.wildcard.end:
        result = this.handleWildAtSides(type, parts);
        break;
      default:
        result = [];
    }
    return result;
  }

  printResults(results=[], booleanResultOnly = false) {
    if (this.error) {
      console.error(">> ERROR: ", this.error);
      return false;
    } else {
      if (booleanResultOnly) {
        console.log(">> BOOLEAN Result: ", results);
      } else if (results && results.length) {
        console.log(">> Results: " , results)
      } else {
        console.warn(">> Sorry! Found Nothing!");
      }
      return true;
    }
  }


  isInDict(word, booleanResultOnly = false, caseSensitive = ture) {
    this.caseSensitivity.state = caseSensitive;
    word = this.caseSensitivity.applyTo(word);
    if (this.error) return this.printResults(); // exit early if error
    let results = [];
    if (!word) this.error = "Bad search keyword";
    else results = booleanResultOnly ? this.handeleBooleanOnly(word) : this.search(word);
    return this.printResults(results, booleanResultOnly);
  }

  printSpacer() {
    console.log("---------------");
  }
} // end class
