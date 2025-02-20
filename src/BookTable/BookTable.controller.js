import { Table } from "../../model/BookTable.js";


// إرجاع جميع الطاولات
export const getTables = async (req, res) => {
    async (req, res) => {
        try {
          const tables = await Table.find();
          res.json(tables);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
}
// تحديث حالة الحجز
export const updateTable = async (req, res) => {
    async (req, res) => {
        try {
          const table = await Table.findById(req.params.id);
          if (!table) return res.status(404).json({ message: "Table not found" });
      
          table.isReserved = !table.isReserved;
          await table.save();
          res.json({ message: "Table updated", table });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
}