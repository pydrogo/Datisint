
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace Datis.Data
{

using System;
    using System.Collections.Generic;
    
public partial class Category
{

    public Category()
    {

        this.BrandCategories = new HashSet<BrandCategory>();

        this.Features = new HashSet<Feature>();

    }


    public int Id { get; set; }

    public string Name { get; set; }

    public Nullable<int> ParentId { get; set; }



    public virtual ICollection<BrandCategory> BrandCategories { get; set; }

    public virtual ICollection<Feature> Features { get; set; }

}

}
