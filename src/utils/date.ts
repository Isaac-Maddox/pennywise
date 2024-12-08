export function getStartOfMonth() {
   const now = new Date();
   return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function getOneYearAgo() {
   const now = new Date();
   return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
}