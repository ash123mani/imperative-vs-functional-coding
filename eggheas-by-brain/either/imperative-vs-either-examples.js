// Imperative Style:
function openSite(user) {
  if (user) {
    return renderPage(user);
  } else {
    return showLogin();
  }
}
// Functional (Composable using Either):
function openSite(user) {
  return fromNullable(user).fold(showLogin, renderPage);
}

// Imperative Style:
function getPrefs(user) {
  if (user.premium) {
    return user.prefs;
  } else {
    return defaultPrefs;
  }
}
// Functional (Composable using Either):
function getPrefs(user) {
  return (user.premium ? Right(user) : Left("not premium")).fold(
    () => defaultPrefs,
    (u) => u.prefs,
  );
}

// Imperative:
function streetName(user) {
  const address = user.address;
  if (address) {
    const street = address.street;
    if (street) {
      return street.name;
    }
  }
  return "no street";
}
// Functional (Composable using Either):
function streetName(user) {
  return fromNullable(user.address)
    .chain((address) => fromNullable(address.street))
    .map((street) => street.name)
    .fold(
      () => "no street",
      (name) => name,
    );
}
