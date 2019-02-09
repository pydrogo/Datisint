using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class AgancyRequestVM
    {
        public int Id { get; set; }
        public string NameSherkatForushgah { get; set; }
        public string NameModiramelMasool { get; set; }
        public string Email { get; set; }
        public string Ostan { get; set; }
        public string Shahrestan { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        public string RegisterDate { get; set; }
        public string RegisterPlace { get; set; }
        public string TedadPersonnelFanni { get; set; }
        public string TedadPersonnelEdari { get; set; }
        public string TedadPersonnelForush { get; set; }
        public string ProjeAnjamDadeid { get; set; }
        public string NamayandegBrandDashte { get; set; }
        public string TavanayiSaliane { get; set; }
        public string AshnayiBaPrada { get; set; }
        public string EjareShakhsi { get; set; }
        public string NoeZemanat { get; set; }
        public bool SanadMelki { get; set; }
        public bool Safte { get; set; }
        public bool CheckeZemanat { get; set; }
        public bool ZemanatNamehBanki { get; set; }
        public bool VajhNaghd { get; set; }
    }
}