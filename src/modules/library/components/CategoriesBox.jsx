// CategoriesBox Component
import React from "react";

function CategoriesBox() {
  return (
    <div>
      <div className="flex items-center p-3">
        {/* List */}
        <input type="checkbox" className="checkbox checkbox-secondary" />
        <span className="label-text ml-3 text-lg">Name</span>
      </div>
    </div>
  );
}

export default CategoriesBox;
