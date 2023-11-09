set myVariable to do shell script "echo $" & item 1 of (system attribute "MyScriptArguments")
display dialog "Received: " & myVariable