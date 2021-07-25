using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RShreeji.Models.Common
{
    public class clsCommonFunction
    {
        public static void GetControllerAndAction(string strPath, ref string strController, ref string strAction)
        {
            if (!string.IsNullOrEmpty(strPath))
            {
                string[] arrPath = strPath.Split('/').Where(a => !string.IsNullOrEmpty(a)).ToArray();
                if (arrPath.Length > 0)
                {
                    strController = arrPath[0];
                    if (arrPath.Length > 1)
                    {
                        string[] arrAction = arrPath[1].Split('?').Where(a => !string.IsNullOrEmpty(a)).ToArray();
                        strAction = arrAction[0];
                    }
                    else
                    {
                        strAction = ActionNames.Index;
                    }
                }
                else
                {
                    strController = ControllerNames.Home;
                    strAction = ActionNames.Index;
                }
            }
            else
            {
                strController = ControllerNames.Home;
                strAction = ActionNames.Index;
            }
        }

        public static bool CheckForCurrentPage(string strPath,string strController, string strAction)
        {
            string strUrlController = "", strUrlAction = "";
            clsCommonFunction.GetControllerAndAction(strPath, ref strUrlController, ref strUrlAction);

            if (strController == strUrlController && strAction == strUrlAction)
                return true;
            return false;
        }
    }
}
