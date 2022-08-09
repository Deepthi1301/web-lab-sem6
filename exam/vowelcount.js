function vowelCount(str){
    var count = {}
    var vowels = ['a','e','i','o','u']

    for(let i=0; i<str.length;i++){
        if(vowels.includes(str[i])){
            if(count[str[i]]){
                count[str[i]]++;
            } else{
                count[str[i]]=1;
            }
        }
        
    }
    console.log(count)
    return count;
}

var text = 'Le Tour de France'
var num = vowelCount(text)

console.log("Vowel count in "+ text + " is : " + JSON.stringify(num));
