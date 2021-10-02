import $ from "jquery";

const toggleExpand = (target, expand = target) => {
  if($(target).closest(".client").length > 0 && !$(target).closest(".client").hasClass("expanded")) {
    $(".home .portfolio .client").removeClass("expanded");
    $(".home .portfolio .client .expander-button").attr("aria-pressed", "false");
    $(".home .portfolio .client .expander-button").attr("aria-expanded", "false");
    $(expand).toggleClass("expanded");
    // $(expand).children("figure").animate({
    //     width: "toggle"
    // }, 5000);
    $(target).attr("aria-pressed") == "true" ? $(target).attr("aria-pressed", "false") : $(target).attr("aria-pressed", "true");
    $(target).attr("aria-expanded") == "true" ? $(target).attr("aria-expanded", "false") : $(target).attr("aria-expanded", "true");
  }
}

const runExpand = (e, expand) => {
  if(expand) toggleExpand($(e.target).closest(".expander-button"), $(e.target).closest(expand));
  else toggleExpand($(e.target).closest(".expander-button"));
}

const buttonClassName = (className, expand, isExpanded) => {
  let name = "expander-button";
  if(className) name += ` ${className}`;
  if(isExpanded && !expand) name += ` expanded`;
  return name;
}

const ExpanderButton = props => {
  const {
      className,
      expand,
      expanded,
      children
  } = props;

  const isExpanded = expanded ? true : false;

  return (
    <button 
      type="button"
      tabIndex={0}
      className={buttonClassName(className, expand, isExpanded)}
      aria-pressed={isExpanded ? "true" : "false"}
      aria-expanded={isExpanded ? "true" : "false"}
      onClick={e => runExpand(e, expand)}
      onKeyPress={e => e.key === "Enter" && runExpand(e, expand)}>

      <div tabIndex={-1}>
        {children}
      </div>
    </button>
  );
}

export default ExpanderButton;
