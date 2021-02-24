export default function(used, total){
  used = parseFloat(used); 
  total = parseFloat(total);
  if (isNaN(used) || isNaN(total)) {
    return 0;
  }
  return used / total * 100;
}