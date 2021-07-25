using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RShreeji.ViewModels
{
    public class clsProductsViewModel
    {
        public List<clsProductsViewModel.clsProducts> MasalaBenefits { get; set; }
        public List<clsProductsViewModel.clsProducts> Products { get; set; }

        public class clsProducts
        {
            public string imgpath { get; set; }
            public string description { get; set; }
            public string subdescription { get; set; }
            public string classname { get; set; }
            public string classdescription { get; set; }
            public int? sortorder { get; set; }
            public string thumbimgpath
            {
                get
                {
                    if (!string.IsNullOrEmpty(this.imgpath))
                    {
                        return this.imgpath.Replace("original/", "thumb/").Replace("-org-", "-thumb-");
                    }
                    return null;
                }
            }
        }
    }
}
