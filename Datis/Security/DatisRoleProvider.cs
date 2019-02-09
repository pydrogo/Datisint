using System;
using System.Collections.Generic;
using System.Configuration.Provider;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Security;
using Datis.Data;
using WebMatrix.WebData;

namespace Datis.Security
{
    public class DatisRoleProvider : RoleProvider
    {
        public override string[] GetRolesForUser(string username)
        {
            using (DatisEntities objContext = new DatisEntities())
            {
                var objUser = objContext.UserProfiles.FirstOrDefault(x => x.UserName == username);
                if (objUser == null)
                {
                    return null;
                }
                string[] ret = objUser.webpages_Roles.Select(x => x.RoleName).ToArray();
                return ret;
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            foreach (string rolename in roleNames)
            {
                if (string.IsNullOrEmpty(rolename))
                    throw new ProviderException("Role name cannot be empty or null.");
                if (!RoleExists(rolename))
                    throw new ProviderException("Role name not found.");
            }
            using (var de = new DatisEntities())
            {
                foreach (var userName in usernames)
                {
                    var userId = WebSecurity.GetUserId(userName);
                    var user = de.UserProfiles.FirstOrDefault(m => m.UserId == userId);
                    if (user != null)
                    {
                        foreach (var roleName in roleNames)
                        {
                            var role = de.webpages_Roles.FirstOrDefault(n => n.RoleName == roleName);
                            user.webpages_Roles.Add(role);
                        }
                        de.Entry(user).State = EntityState.Modified;
                        de.SaveChanges();
                    }
                }
            }
        }
        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            using (var de = new DatisEntities())
            {
                return de.webpages_Roles.Any(m => m.RoleName == roleName);
            }
        }
    }
}