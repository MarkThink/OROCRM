/*global define*/
define(['underscore', 'backgrid', '../formatter/number-formatter'
    ], function (_, Backgrid, NumberFormatter) {
    'use strict';

    /**
     * Number column cell.
     *
     * @export  orodatagrid/js/datagrid/cell/number-cell
     * @class   orodatagrid.datagrid.cell.NumberCell
     * @extends Backgrid.NumberCell
     */
    return Backgrid.NumberCell.extend({
        /** @property {orodatagrid.datagrid.formatter.NumberFormatter} */
        formatterPrototype: NumberFormatter,

        /** @property {String} */
        style: 'decimal',

        /**
         * @inheritDoc
         */
        initialize: function (options) {
            _.extend(this, options);
            Backgrid.Cell.prototype.initialize.apply(this, arguments);
            this.formatter = this.createFormatter();
        },

        /**
         * Creates number cell formatter
         *
         * @return {orodatagrid.datagrid.formatter.NumberFormatter}
         */
        createFormatter: function () {
            return new this.formatterPrototype({style: this.style});
        },

        /**
         * @inheritDoc
         */
        enterEditMode: function (e) {
            if (this.column.get("editable")) {
                e.stopPropagation();
            }
            return Backgrid.NumberCell.prototype.enterEditMode.apply(this, arguments);
        }
    });
});
