import $ from "jquery";
import {useEffect} from "react";

const SlideTrigger = props => {
    const runToggle = (target, expand = target) => {
      $(expand).toggleClass("expanded");
      $(target).attr("aria-pressed") == "true" ? $(target).attr("aria-pressed", "false") : $(target).attr("aria-pressed", "true");
      $(target).attr("aria-expanded") == "true" ? $(target).attr("aria-expanded", "false") : $(target).attr("aria-expanded", "true");
      $(target).next(".slide-toggle").slideToggle();
    }

    const slideToggle = e => {
      e.preventDefault();
      const trigger = $(e.target).next(".slide-toggle").length === 0 ? $(e.target).closest(".slide-trigger") : $(e.target);
      runToggle(trigger);
    }

    useEffect(() => {
      $(".slide-trigger").off("click").on("click", e => slideToggle(e));
      $(".slide-trigger").off("keypress").on("keypress", e => e.key === "Enter" && slideToggle(e));
    });
    
    return (
      <button type="button" tabIndex={0} className="slide-trigger" aria-pressed="false" aria-expanded="false">
        <div tabIndex={-1}>
          {props.children}
        </div>
      </button>
    );
}

export default SlideTrigger;
