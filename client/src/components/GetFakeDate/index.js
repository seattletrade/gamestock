export default function GetFakeDate() {
       // This is for Presentation (Manupulating DATE)
       //It is always This Year / This Month / Today / 13:07:00
       let thisYear = (new Date().getFullYear()).toString();
       let thisMonth = (new Date().getMonth()).toString();
       let today = (new Date().getDate()).toString();
       
       return (new Date(thisYear, thisMonth, today, 13, 7, 0));
}