/*
 * Copyright 2015-2016 Imply Data, Inc.
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Customization } from "../../../../common/models/customization/customization";
import { User } from "../../../../common/models/user/user";
import { Fn } from "../../../../common/utils/general/general";
import { SvgIcon } from "../../../components/svg-icon/svg-icon";
import { UserMenu } from "../../../components/user-menu/user-menu";
import "./home-header-bar.scss";

export interface HomeHeaderBarProps {
  user?: User;
  onNavClick: Fn;
  customization?: Customization;
  title?: string;
}

export interface HomeHeaderBarState {
  userMenuOpenOn?: Element;
}

export class HomeHeaderBar extends React.Component<HomeHeaderBarProps, HomeHeaderBarState> {
  constructor(props: HomeHeaderBarProps) {
    super(props);
    this.state = {
      userMenuOpenOn: null
    };
  }

  // User menu

  onUserMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    const { userMenuOpenOn } = this.state;
    if (userMenuOpenOn) return this.onUserMenuClose();
    this.setState({
      userMenuOpenOn: e.target as Element
    });
  }

  onUserMenuClose = () => {
    this.setState({
      userMenuOpenOn: null
    });
  }

  renderUserMenu() {
    const { user, customization } = this.props;
    const { userMenuOpenOn } = this.state;
    if (!userMenuOpenOn) return null;

    return <UserMenu
      openOn={userMenuOpenOn}
      onClose={this.onUserMenuClose}
      user={user}
      customization={customization}
    />;
  }

  render() {
    var { user, onNavClick, customization, title } = this.props;

    var userButton: JSX.Element = null;
    if (user) {
      userButton = <div className="icon-button user" onClick={this.onUserMenuClick}>
        <SvgIcon svg={require("../../../icons/full-user.svg")} />
      </div>;
    }

    var headerStyle: any = null;
    if (customization && customization.headerBackground) {
      headerStyle = {
        background: customization.headerBackground
      };
    }

    return <header className="home-header-bar" style={headerStyle}>
      <div className="left-bar" onClick={onNavClick}>
        <div className="menu-icon">
          <SvgIcon svg={require("../../../icons/menu.svg")} />
        </div>
        <div className="title">{title}</div>
      </div>
      <div className="right-bar">
        {this.props.children}
        {userButton}
      </div>
      {this.renderUserMenu()}
    </header>;
  }
}
