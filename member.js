function skillsMember()                                                            // Function: skillsMember()
{
    var skills = [ "HTML", "CSS", "JavaScript", "Python", "Java", "C++", "Ruby", "Go", "C#", "Swift", "Objective-C", "PHP", "SQL" ];
    var skillsElement = document.getElementById("skills");
    
    for (var i = 0; i < skills.length; i++)
    {
        var skill = document.createElement("li");
        skill.textContent = skills[i];
        skillsElement.appendChild(skill);
    }
}