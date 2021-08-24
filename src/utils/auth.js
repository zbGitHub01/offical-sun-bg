const TokenKey = 'token'
const RoleKey = 'role'
const UsernameKey = 'username'
const AvatarKey = 'avatar'
const AuthKey = 'auth'
const OrgId = 'orgid'
const DefaultId = 'defaultId'
const DepartmentId = 'departmentId'

export function getToken() {
    return localStorage.getItem(TokenKey)
}
export function setToken(token) {
    return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}

export function getRole() {
    return localStorage.getItem(RoleKey)
}
export function setRole(role) {
    return localStorage.setItem(RoleKey, role)
}
export function removeRole() {
    return localStorage.removeItem(RoleKey)
}

export function getUsername() {
    return localStorage.getItem(UsernameKey)
}
export function setUsername(username) {
    return localStorage.setItem(UsernameKey, username)
}
export function removeUsername() {
    return localStorage.removeItem(UsernameKey)
}

export function getAvatar() {
    return localStorage.getItem(AvatarKey)
}
export function setAvatar(avatar) {
    return localStorage.setItem(AvatarKey, avatar)
}
export function removeAvatar() {
    return localStorage.removeItem(AvatarKey)
}


export function getAuth() {
    return localStorage.getItem(AuthKey)
}
export function setAuth(auth) {
    return localStorage.setItem(AuthKey, auth)
}

export function removeAuth() {
    return localStorage.removeItem(AuthKey)
}

export function getOrgId() {
    return localStorage.getItem(OrgId)
}
export function setOrgId(orgid) {
    return localStorage.setItem(OrgId, orgid)
}

export function removeOrgId() {
    return localStorage.removeItem(OrgId)
}

export function getDepartmentId() {
    return localStorage.getItem(DepartmentId)
}
export function setDepartmentId(departmentId) {
    return localStorage.setItem(DepartmentId, departmentId)
}

export function removeDepartmentId() {
    return localStorage.removeItem(DepartmentId)
}

export function getDefaultId() {
    return localStorage.getItem(DefaultId)
}

export function setDefaultId(defaultId) {
    return localStorage.setItem(DefaultId, defaultId)
}

export function removeDefaultId() {
    return localStorage.removeItem(DefaultId)
}