import React, { Component } from "react";
import { fuzzySearch } from "@/helpers/misc";

export default class InventoryAdjustmentsCreateItemsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxFocused: false,
      searchResults: [],
      term: "",
      highlighted: -1
    };
  }

  onSearch(term) {
    this.setState({ term, searchBoxFocused: true }, () => {
      if (term.length > 0) {
        return this.setState({
          searchResults: [
            ...fuzzySearch({
              list: this.props.items.data,
              keys: ["name", "sku"],
              term
            })
          ]
        });
      }
      return;
    });
  }

  onSelect(item) {
    this.setState(
      { searchBoxFocused: false, searchResults: [], term: "" },
      () => this.props.onSelect(item)
    );
  }

  render() {
    const { highlighted, searchBoxFocused, searchResults, term } = this.state;
    const { isSaving, items } = this.props;

    return (
      <div className="mb-3" style={{ position: "relative" }}>
        <input
          type="text"
          className="form-control"
          placeholder={
            items.data.length === 0 && items.fetching
              ? "Loading"
              : "Type to search for items to add.."
          }
          disabled={(items.data.length === 0 && items.fetching) || isSaving}
          value={term}
          onKeyDown={e => {
            switch (e.keyCode) {
              case 27:
                return this.setState({ searchBoxFocused: false });
              case 13:
                return searchBoxFocused && highlighted > -1
                  ? this.onSelect(searchResults[highlighted])
                  : false;
              case 38:
                return this.setState({
                  highlighted: highlighted > 0 ? highlighted - 1 : 0
                });
              case 40:
                return this.setState({ highlighted: highlighted + 1 });
            }
          }}
          onChange={e => this.onSearch(e.target.value)}
          onFocus={() => this.setState({ searchBoxFocused: true })}
          onBlur={() => this.setState({ searchBoxFocused: false })}
        />
        {term.length > 0 && searchBoxFocused && (
          <div
            className="w-100 pt-1"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 9999
            }}>
            <div className="border rounded bg-white">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <button
                    key={"search-results-item-" + index}
                    onMouseDown={() => this.onSelect(result)}
                    onMouseEnter={() => this.setState({ highlighted: index })}
                    onMouseLeave={() => this.setState({ highlighted: -1 })}
                    className={
                      "btn btn-block px-3 py-2 d-flex m-0 rounded-0" +
                      (index > 0 ? " border-top" : "") +
                      (highlighted === index ? " bg-light" : "")
                    }>
                    <img
                      src={"https://picsum.photos/50?nonce=" + result.sku}
                      alt={result.name}
                      className="rounded mr-3"
                      style={{ height: 50, width: 50 }}
                    />
                    <div style={{ flex: 1 }} className="text-left">
                      <div>
                        {result.name} ({result.sku})
                      </div>
                      <div className="text-muted">
                        Current Quantity: {result.currentQuantity}{" "}
                        {result.unit.data.shortName}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3">No items found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
