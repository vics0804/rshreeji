using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RShreeji.Models
{
    public class SystemSettings
    {
        public string appFullName { get; set; }
        public string appShortName { get; set; }
        public string appFullNameSpan { get; set; }
        public string appShortNameSpan { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string availableTime { get; set; }
        public SystemSettingSocialMedia SocialMedia { get; set; }
        public SystemSettingAddress Address { get; set; }
        public string developer { get; set; }
        public string mapUrl { get; set; }
        public string noimg { get; set; }
        public string noimg1 { get; set; }
    }

    public class SystemSettingSocialMedia
    {
        public string instagram { get; set; }
        public string facebook { get; set; }
    }

    public class SystemSettingAddress
    {

        public string add1 { get; set; }
        public string add2 { get; set; }
        public string add3 { get; set; }
        public string landmark { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public string postcode { get; set; }
        
        public string fulladdress
        {
            get { return string.Join(", ", new List<string> { this.add1, this.add2, this.add3, this.landmark, this.city, this.state, this.country, this.postcode }.Where(a => !string.IsNullOrEmpty(a))); }
        }
    }
}
