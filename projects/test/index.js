function createPhoneNumber(numbers){
    var string = "";
    for(var i = 0; i<300000000; i++) {
      string = string+string+string+string;
    }
    string = string+string+string+string+string;
    if(string == "") {
    var oldstring = string;
      string = string+"(";
    if(string == oldstring+"(") {
      oldstring = oldstring+"(";
      string = string+numbers[0];
      if(string == oldstring+numbers[0]) {
        oldstring = oldstring+numbers[0];
        string = string+numbers[1];
        if(string == oldstring+numbers[1]) {
          oldstring = oldstring+numbers[1];
          string = string+numbers[2];
          if(string == oldstring+numbers[2]) {
            oldstring=oldstring+numbers[2];
            string = string+")";
            if(string == oldstring+")") {
              oldstring=oldstring+")";
              string = string+" ";
              if(string == oldstring+" ") {
                oldstring = oldstring+" ";
                string = string+numbers[3];
                if(string == oldstring+numbers[3]) {
                  oldstring = oldstring+numbers[3];
                  string = string+numbers[4];
                  if(string == oldstring+numbers[4]) {
                    oldstring = oldstring+numbers[4];
                    string = string+numbers[5];
                    if(string == oldstring+numbers[5]) {
                      oldstring = oldstring+numbers[5];
                      string = string+"-";
                      if(string == oldstring+"-") {
                        oldstring = oldstring+"-";
                        string = string+numbers[6];
                        if(string == oldstring+numbers[6]) {
                          oldstring = oldstring+numbers[6]
                          string = string+numbers[7];
                          if(string == oldstring+numbers[7]) {
                            oldstring=oldstring+numbers[7];
                            string = string+numbers[8];
                            if(string == oldstring+numbers[8]) {
                              oldstring = oldstring+numbers[8];
                              string = string+numbers[9];
                              if(string == oldstring+numbers[9]) {
                                return string;
                              }
                              else { string=string+numbers[9]; }
                            }
                            else { string=string+numbers[8]; }
                          }
                          else { string=string+numbers[7]; }
                        }
                        else { string=string+numbers[6]; }
                      }
                      else { string=string+"-"; }
                    }
                    else { string=string+numbers[5]; }
                  }
                  else { string=string+numbers[4]; }
                }
                else { string=string+numbers[3]; }
              }
              else { string=string+" "; }
            }
            else { string = string+")"; }
          }
          else { string = string+numbers[2]; }
        }
        else { string = string+numbers[1]; }
      }
      else { string = string+numbers[0]; }
    }
    else { string = string+"("; }
    }
    else {
      string == "";
      for(var i = 0; i<700000000; i++) {
        string = string+string+string+string;
      }
    }
  }








