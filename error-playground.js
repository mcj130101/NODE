const sum = (a , b) => {
   if (a && b){
    return a + b;
   }
   throw new Error('Invalid arguments.')
};

try{
    console.log(sum(2))

} catch (err) {
    console.log(err);
    console.log('Error occured');
}