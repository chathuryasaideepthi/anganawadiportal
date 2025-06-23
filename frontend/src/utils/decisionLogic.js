const generateSuggestions = (que,ans)=>{ // que - set of question, ans - yes/no replies given
    const topics = new Set() // contains the problems/concerns 
    const notes = []

    que.forEach((que,ind)=>{

        const each_ans = ans[ind]?.toLowerCase()
        const each_que = que.toLowerCase()
        //suggestions are generated only if the selected option is no
        if(each_ans === "no"){

            if(each_que.includes("breastfed")) {
            topics.add("Infant & Young Child Feeding (IYCF)");
            notes.push("Counsel the mother to ensure exclusive breastfeeding for the first 6 months.");
            } 
        
            else if (each_que.includes("weight") || each_que.includes("growth")) {
                topics.add("Growth Monitoring");
                notes.push("Refer the child for a weight check. Monitor growth on MCP card.");
            } 
            
            else if (each_que.includes("complementary")) {
                topics.add("Nutrition Counselling");
                notes.push("Guide the caregiver to introduce homemade semi-solid food at 6 months.");
            } 
            
            else if (each_que.includes("iron") || each_que.includes("ifa")) {
                topics.add("Anemia Prevention");
                notes.push("Ensure daily IFA tablet intake and promote iron-rich diet.");
            } 
            
            else if (each_que.includes("meals") || each_que.includes("diet")) {
                topics.add("Maternal Nutrition");
                notes.push("Encourage 3 full meals + 2 snacks for pregnant/lactating women.");
            } 
            
            else if (each_que.includes("vaccination")) {
                topics.add("Immunization");
                notes.push("Ensure child is vaccinated as per schedule. Refer to health center.");
            } 
            
            else {
                topics.add("General Counselling");
                notes.push("Provide health guidance based on the mother's or child's condition.");
            }

        }
    })

    return {
    topics: Array.from(topics),
    notes: notes.join(" ")
  };

}

export default generateSuggestions