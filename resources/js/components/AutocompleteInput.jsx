import React, { PureComponent, forwardRef } from "react";
import PropTypes from "prop-types";
import { fuzzySearch } from "@/helpers/misc";

class AutocompleteInput extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultState = {
      focused: false,
      term: "",
      highlighted: -1
    };
    this.state = { ...this.defaultState };
  }

  search(term) {
    return term.length > 0
      ? [
          ...fuzzySearch({
            list: this.props.items,
            keys: this.props.searchKeys ? [...this.props.searchKeys] : ["name"],
            term
          })
        ]
      : [];
  }

  onSelect(result) {
    this.setState({ ...this.defaultState }, () => this.props.onSelect(result));
  }

  render() {
    const {
      containerClassName,
      containerStyle = {},
      inputClassName,
      disabled,
      emptyLabel,
      innerRef,
      items,
      loading,
      placeholder,
      placeholderLoading,
      renderResult
    } = this.props;
    const { focused, highlighted, term } = this.state;
    const results = this.search(term);

    return (
      <div
        className={containerClassName}
        style={{ position: "relative", ...containerStyle }}>
        <input
          ref={innerRef}
          type="text"
          className={"form-control " + inputClassName}
          placeholder={
            items.length === 0 && loading
              ? placeholderLoading || "Loading"
              : placeholder || "Type to search.."
          }
          disabled={(items.length === 0 && loading) || disabled}
          value={term}
          onKeyDown={e => {
            switch (e.keyCode) {
              case 27:
                return this.setState({ focused: false });
              case 13:
                return focused && highlighted > -1
                  ? this.onSelect(results[highlighted])
                  : false;
              case 38:
                return this.setState({
                  highlighted: highlighted > 0 ? highlighted - 1 : 0
                });
              case 40:
                return this.setState({ highlighted: highlighted + 1 });
            }
          }}
          onChange={e => this.setState({ focused: true, term: e.target.value })}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
        />
        {term.length > 0 && focused && (
          <div
            className="w-100 pt-1"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 9999
            }}>
            <div className="border rounded bg-white">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <button
                    key={"search-results-item-" + index}
                    onMouseDown={() => this.onSelect(result)}
                    onMouseEnter={() => this.setState({ highlighted: index })}
                    onMouseLeave={() => this.setState({ highlighted: -1 })}
                    className={
                      "btn btn-block text-left px-3 py-2 m-0 rounded-0" +
                      (index > 0 ? " border-top" : "") +
                      (highlighted === index ? " bg-light" : "")
                    }>
                    {renderResult ? (
                      renderResult(result)
                    ) : (
                      <div>{result.name}</div>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-3">{emptyLabel || "No items found."}</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

AutocompleteInput.propTypes = {
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  emptyLabel: PropTypes.string,
  items: PropTypes.array.isRequired,
  inputClassName: PropTypes.string,
  loading: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  placeholderLoading: PropTypes.string,
  renderResult: PropTypes.func,
  searchKeys: PropTypes.array
};

export default forwardRef((props, ref) => (
  <AutocompleteInput innerRef={ref} {...props} />
));
